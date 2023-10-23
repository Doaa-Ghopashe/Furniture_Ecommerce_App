const mongoose = require('mongoose'),

    categorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minLenght:4,
            maxLength:14
        }
    }),

    Category = mongoose.model('Category', categorySchema);

module.exports = Category