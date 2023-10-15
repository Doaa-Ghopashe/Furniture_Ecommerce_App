const mongoose = require('mongoose');

let userVerificationSchema = new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
}),

    userVerification = mongoose.model('userVerification', userVerificationSchema);

module.exports = userVerification; 