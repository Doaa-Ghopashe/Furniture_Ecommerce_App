const userVerification = require('../model/userVerification'),

    userModel = require('../model/user'),

    passwordReset = require('../model/passwordReset'),

    secretKey = process.env.SECRET_KEY,

    jwt = require('jsonwebtoken'), bcrypt = require('bcrypt'),

    validator = require('../middleware/emailVerification');

let register = async (req, res) => {
    try {
        let { name, password, confirmPassword, email } = req.body;

        if (!(name && password && confirmPassword && email))

            return res.status(400).send('All inputs should be existed');

        if (password != confirmPassword)

            return res.status(400).send('confirm password should match password');

        let oldUser = await userModel.findOne({ email });

        if (oldUser)

            return res.status(400).send('Email have already exists, Please login');

        let encryptedPassword = await bcrypt.hash(password, 10);

        userModel
            .create({
                name,
                email,
                password: encryptedPassword,
                verified: false
            })
            .then(result => {
                //handle account verification by sending mail to the account
                validator.sendVerificationEmail(result);

                res.json({
                    status: 200,
                    message: 'Email is sent, Please verify it'
                })

            })
            .catch((err) => {
                console.log(err);

                res.json({
                    status: 400,
                    send: "Error in DB Process"
                })

            });
    } catch (err) {
        console.log(err);
    }
}

let login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!(email && password))

            return res.status(400).send('All inputs are required');

        const user = await userModel.findOne({ email });

        if (!user.verified)

            return res.status(400).send('Please verify the email first then back login');

        //compare the password with the encrypted password
        if (user && (await bcrypt.compare(password, user.password))) {

            //create the token 
            const token = jwt.sign(
                {
                    name: user.name,
                    id: user._id,
                    email
                }, secretKey,
                {
                    expiresIn: "2h"
                }
            )
            //return the respone
            return res.status(200).json(token);
        }
        //in case the password doesn't match the real password
        res.status(400).send('Wrong email or password');
    } catch (err) {
        console.log(err)
    }
}

let profile = (req, res) => {

    const { id } = req.user

    userModel.findById(id, (err, profile) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Error: "DB Error" })
        }

        return res.status(200).json(profile)
    })
}

let updateProfile = async (req, res) => {
    //first we need to destruct the comming request
    let { email, name } = req.body;

    //then we need to get the id of that user 
    const { id } = req.user;

    try {
        //then we need to check that both fields are received
        let user = await userModel.findById(id);

        //update the data either with the sent data or the data that already saved in the database
        await userModel.updateOne(user,
            { email: email || user.email, name: name || user.name });

        //return a successful message
        return res.status(200).send("data updated successfully");

    } catch (err) {
        return res.status(400).send("id doesn't exist");
    }
}

let logout = (req, res) => {
    res.send("<h1>logout of user account</h1>")
}

let verify = (req, res) => {
    let { userId, uniqueStr } = req.params;

    //search for the user in the userVerification collection
    userVerification
        .find({ userId })
        .then((result) => {

            //check if the user exists in the collection or not
            if (result.length <= 0) {
                return res.json({
                    status: 400,
                    message: "Account has already verified, or doesn\'t exist"
                });
            }

            //destruct the returned user data
            const { expiresAt, uniqueString } = result[0];

            //here we handle the case where the link expired
            if (Date.now() > expiresAt) {
                //if the link expired then the data should be deleted from the collection to allow signing up again
                userVerification
                    .deleteOne({ userId })
                    .then(() => {
                        userModel
                            .deleteOne({ _id: userId })
                            .then(() => {
                                res.json({
                                    status: 200,
                                    message: 'The link has been expired, Please sign up again'
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({
                                    status: 400,
                                    message: 'The account could not be deleted'
                                });
                            })
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({
                            status: 400,
                            message: 'The deletion process could not be completed'
                        });
                    })
            }

            //compare the hashed unique string with the real string
            bcrypt
                .compare(uniqueStr, uniqueString)
                .then((result) => {

                    //check if the two strings are the same
                    if (result) {

                        //set true to the verified field and delete the verification record from the verification collection
                        userModel
                            .updateOne({ _id: userId }, { verified: true })
                            .then(() => {
                                userVerification
                                    .deleteOne({ userId })
                                    .then(() => {
                                        return res.json({
                                            status: 200,
                                            message: 'Email verified'
                                        });
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        return res.json({
                                            status: 400,
                                            message: 'User does not exist in verification collection'
                                        });
                                    })
                            })
                            .catch((err) => {
                                console.log(err);
                                return res.json({
                                    status: 400,
                                    message: 'User update does not completed successfully'
                                });
                            })
                    } else {
                        return res.status(400).send('Existing email, but incorrect verification details')
                    }
                })
                .catch((err) => {
                    res.status(400).send('An error occurred while comparing the unique strings')
                })

        })
        .catch((err) => {
            console.log(err);
            res
                .status(400)
                .send('not verified');
        })
}

let sendPasswordResetEmail = (req, res) => {

    const { email } = req.body;

    if (!email)

        return res.status(400).send("Email is not found, Please enter the email");

    userModel
        .findOne({ email })
        .then((result) => {
            //check if there is a result
            if (result) {
                validator.sendResetPasswordLink(result)
                return res.status(200).send('Email send successfully')
            }
            res.status(200).send('Email does not exist')
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send("Email is not found, Please sign up")
        })
}

let updatePassword = (req, res) => {

    const { password, confirmPassword } = req.body,

        { userId, uniqueStr } = req.params;
        console.log(uniqueStr);

    if (!(password && confirmPassword && userId && uniqueStr))

        return res.status(400).send("You should enter the two passwords");

    if (password != confirmPassword)

        return res.status(400).send('confirm password should match password');

    passwordReset
        .find({ userId })
        .then((result) => {

            if (result.length <= 0)

                return res.json({
                    status: 400,
                    message: "There is no ask to change the password"
                });

            const { expiresAt, uniqueString } = result[0];

            if (Date.now() > expiresAt) {

                passwordReset
                    .deleteOne({ userId })
                    .then(() => {
                        res.json({
                            status: 200,
                            message: 'The link has been expired, Please send a demand again to reset the password'
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({
                            status: 400,
                            message: 'The deletion process could not be completed'
                        });
                    });
            }

            bcrypt
                .compare(uniqueStr, uniqueString)
                .then((result) => {
                    if (result) {
                        userModel
                            .updateOne({ _id: userId }, { password })
                            .then(() => {
                                passwordReset
                                    .deleteOne({ userId })
                                    .then(() => {
                                        return res.json({
                                            status: 200,
                                            message: 'Password has been changes'
                                        });
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                        return res.json({
                                            status: 400,
                                            message: 'User does not exist in collection'
                                        });
                                    })
                            })
                            .catch((err) => {
                                console.log(err);
                                return res.json({
                                    status: 400,
                                    message: 'Password update does not completed successfully'
                                });
                            })
                    } else {
                        return res.status(400).send('Existing email, but incorrect verification details')
                    }
                })
                .catch((err) => {
                    res.status(400).send('An error occurred while comparing the unique strings')
                })

        })
        .catch(() => {
            console.log(err);
            res
                .status(400)
                .send('Password hasn\'t be updated');
        })
}

module.exports = {
    login, logout, register,
    profile, updateProfile,
    verify, sendPasswordResetEmail, updatePassword
};