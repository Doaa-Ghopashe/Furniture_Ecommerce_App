const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name : {
        type:'string',
        required:true
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
    token: String
}),

    user = mongoose.model('user',userSchema);

module.exports = user; 