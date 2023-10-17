const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name : {
        type:'string',
        required:true,
        minLength:[3,"username length should be between 3 and 14"],
        maxLength:[14,"username length should be between 3 and 14"]
    },
    email: {
        type:'string',
        required:true,
        unique:true,
        match:/.+@.+\.com/,
        lowercase:true
    },
    password: {
        type:'string',
        required:true
    },
    verified:Boolean,
    token: String
}),

    user = mongoose.model('user',userSchema);

module.exports = user; 