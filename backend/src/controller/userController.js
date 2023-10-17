



const userVerification = require('../model/userVerification'),

    userModel = require('../model/user'),

    { tryCatch } = require('../utlis/tryCatch'),

    { appError } = require('../appError'),

    passwordReset = require('../model/passwordReset'),

    secretKey = process.env.SECRET_KEY,

    jwt = require('jsonwebtoken'), bcrypt = require('bcrypt'),

    validator = require('../middleware/emailVerification');

//register then verify email and set the user data in the database
let register = tryCatch(async (req, res) => {
    let { name, password, confirmPassword, email } = req.body;

    if (!(name && password && confirmPassword && email))
        throw new appError('All inputs should be existed', 400);

    if (password != confirmPassword)
        throw new appError('Confirm password should match password', 400);

    let oldUser = await userModel.findOne({ email });

    if (oldUser)
        throw new appError('Email have already exists, Please login', 400);

    bcrypt.hash(password, 10)
        .then((encryptedPassword) => {
            userModel.create({
                name,
                email,
                password: encryptedPassword,
                verified: false
            }).then(result => {
                validator.sendVerificationEmail(result);
                res.status(200).json({
                    message: 'Email is sent, Please verify it'
                })

            }).catch((err) => {
                return res.status(400).json({
                    message: err.message,
                })
            });
        }).catch((err) => {
            res.status(400).json({
                message: err.message
            })
        });
})

//verify the signed up email 
let verify = (req, res) => {

    const { userId, uniqueStr } = req.params;

    userVerification
        .find({ userId })
        .then((result) => {

            if (!result)
                throw new appError('Account has already verified, or doesn\'t exist', 400)

            const { expiresAt, uniqueString } = result[0];

            if (Date.now() > expiresAt)

                userVerification
                    .deleteOne({ userId })
                    .then(() => {
                        userModel
                            .deleteOne({ _id: userId })
                            .then(() => {
                                throw new appError('The link has been expired, Please sign up again');
                            })
                            .catch((err) => {
                                return res.status(400).json({
                                    message: err.message
                                });
                            })
                    })
                    .catch((err) => {
                        return res.status(400).json({
                            message: err.message
                        });
                    });

            bcrypt
                .compare(uniqueStr, uniqueString)
                .then((result) => {

                    if (result)

                        userModel
                            .updateOne({ _id: userId }, { verified: true })
                            .then(() => {
                                userVerification
                                    .deleteOne({ userId })
                                    .then(() => {
                                        return res.status(200).json({
                                            message: 'Email verified'
                                        });
                                    })
                                    .catch((err) => {
                                        return res.status(400).json({
                                            message: err.message
                                        });
                                    })
                            })
                            .catch((err) => {
                                return res.status(400).json({
                                    message: err.message
                                });
                            })

                    throw new appError('Existing email, but incorrect verification details', 400);
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    });
                })
        })
        .catch((err) => {
            res.status(400).json({
                message: 'not verified'
            });
        })
}

//check the validation of credentials and allow user to login with sending a token
let login = tryCatch(async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password))
        throw new appError('All inputs are required', 400);

    userModel.findOne({ email }).then((user) => {
        if (!user)
            throw new appError('This email is not found, Please sign up', 400);

        if (!user.verified)
            throw new appError('Please verify the email first then back to login', 400);

        bcrypt
            .compare(password, user.password)
            .then((result) => {
                if (!result)
                    throw new Error('Wrong email or password');

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
                return res.status(200).json(token);
            })
            .catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            })
    }).catch((err) => {
        res.status(400).json({
            message: err.message
        })
    });

})

//reset the password as its forgotten
let sendPasswordResetEmail = (req, res) => {

    const { email } = req.body;

    if (!email)
        throw new appError('Email is not found, Please enter the email', 400)

    userModel
        .findOne({ email })
        .then((result) => {

            if (result) {
                validator.sendResetPasswordLink(result)
                return res.status(200).json({
                    message: 'Email send successfully'
                })
            }

            throw new appError('Email does not exist', 400)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
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