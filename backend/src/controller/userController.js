const userVerification = require('../model/userVerification'),

    userModel = require('../model/user'),

    secretKey = process.env.SECRET_KEY,

    jwt = require('jsonwebtoken'), bcrypt = require('bcrypt'),

    validator = require('../middleware/validator');

let register = async (req, res) => {
    //first we need to catch errors
    try {
        //then we need to destruct the coming data
        let { name, password, confirmPassword, email } = req.body;
        //make sure that all this inputs are recieved
        if (!(name && password && confirmPassword && email)) {
            return res.status(400).send('All inputs should be existed');
        }

        //check if both password and confirm_password are matching
        if (password != confirmPassword) {
            return res.status(400).send('confirm password should match password');
        }
        //check if the email is already exists on the database or not
        let oldUser = await userModel.findOne({ email });

        if (oldUser) {
            return res.status(400).send('Email have already exists, Please login');
        }
        //encrypt the password before saving it in the db
        let encryptedPassword = await bcrypt.hash(password, 10);
        //insert the data into the db
        const user = await userModel.create({
            name,
            email,
            password: encryptedPassword,
            verified: false
        }).then((result) => {
            //handle account verification by sending mail to the account
            validator.sendVerificationEmail(result);
        });
        //return the success message
        return res.status(200).send("User Added Successfully")
    } catch (err) {
        console.log(err);
    }
}

let login = async (req, res) => {
    try {
        //destruct the recieved data
        const { email, password, verified } = req.body;
        //first check if both inputs are recieved
        if (!(email && password)) {
            return res.status(400).send('All inputs are required');
        }
        //find if the email is verified so allow him to login
        if (!verified) {
            return res.status(400).send('Please verify the email first then back login');
        }
        //search for the user that has this email
        const user = await userModel.findOne({ email });
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
                    }else{
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

module.exports = { login, logout, register, profile, updateProfile, verify };