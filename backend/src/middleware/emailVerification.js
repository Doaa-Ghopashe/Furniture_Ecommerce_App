const nodemailer = require('nodemailer'),

    userEmail = process.env.AUTH_EMAIL,

    userPass = process.env.AUTH_PASSWORD,

    userVerificationModel = require('../model/userVerification'),

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

    //url to be used in the email
    const currUrl = 'http://localhost:4200/';

    //create a unique string 
    const uniqueString = uuidv4() + _id;

    //compose that will be send 
    const mailerOptions = {
        from: process.env.AUTH_EMAIL,
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

function resetPassword({email,password}) {

}

module.exports = { sendVerificationEmail, resetPassword }