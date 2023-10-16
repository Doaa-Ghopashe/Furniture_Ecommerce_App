const mongoose = require('mongoose');

let passwordResetSchema = new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
}),

    passwordReset = mongoose.model('passwordReset', passwordResetSchema);

module.exports = passwordReset; 