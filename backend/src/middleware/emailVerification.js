    const nodemailer = require('nodemailer'),

    userEmail = process.env.AUTH_EMAIL,

    userPass = process.env.AUTH_PASSWORD,

    userVerificationModel = require('../model/userVerification'),

    currUrl = 'http://localhost:4200/',

    bcrypt = require('bcrypt'),

    { v4: uuidv4 } = require('uuid');

//this transporter will carry the message from the source to destination
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
        user: userEmail,
        pass: userPass
    },
    tls: {
        rejectUnAuthorized: true
    }
});

//check if this transporter is already connected
transporter.verify(err => err ? console.log(err) : console.log("Ready for message"));

function sendVerificationEmail({ _id, email }) {

    //create a unique string 
    const uniqueString = uuidv4() + _id;

    //compose that will be send 
    const mailerOptions = {
        from: userEmail,
        to: email,
        subject: "Verify your email",
        html: `<p>verify your email address to complete sign up process and login into your account </p>
        <p><b>This link expires in 6 hours</b>.</p>
        <p>Press 
        <a href='${currUrl + "user/verify/" + _id + '/' + uniqueString}'>here</a>
        to proceed.</p>`
    }

    const saltVal = 10;

    bcrypt
        .hash(uniqueString, saltVal)
        .then((hashedUniqueStr) => {
            //set the value in the userVerification collection
            const newVerification = new userVerificationModel({
                userId: _id,
                uniqueString: hashedUniqueStr,
                expiresAt: Date.now() + 21600000,
                createdAt: Date.now()
            });
            //after saving the record in the collection, send the mail to the user
            newVerification
                .save()
                .then(() => {
                    transporter
                        .sendMail(mailerOptions)
                        .catch(err => console.log(err));
                    return "Email Send Successfully"
                })
                .catch(err => {
                    console.log(err);
                    return "Error while saving user"
                })
        })
        .catch(err => {
            console.log(err);
            return "Error while saving user"
        })
}

function sendResetPasswordLink({ email, password , _id }) {

    const uniqueString = uuidv4() + _id;

    //compose that will be send
    const mailerOptions = {
        from: userEmail,
        to: email,
        subject:"Reset Password",
        html:`<p>reset password to login </p>
        <p><b>This link expires in 6 hours</b>.</p>
        <p>Press 
        <a href='${currUrl + "resetpassword/" + _id + '/' + uniqueString}'>here</a>
        to proceed.</p>`
    }

    //send mail
    transporter
    .sendMail(mailerOptions)
    .then(()=>{
        console.log('Email send successfully')
        return 'Email send successfully'
    }).catch((err)=>{
        console.log(err);
        return "Email send failed"
    })
}

module.exports = { sendVerificationEmail, sendResetPasswordLink }