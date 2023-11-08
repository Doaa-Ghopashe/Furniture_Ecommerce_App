const product = require('./product');

const mongoose = require('mongoose'),

    categorySchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minLenght: 4,
            maxLength: 14
        },
        image: String
    })
        .pre("deleteOne", function (next) {
            product.findOne({ category_Id: this._conditions._id })
                .then((res) => {
                    if (res) {
                        next('This category cannot be deleted');
                    }else{
                        next(); 
                    }
                })
        }),

    Category = mongoose.model('Category', categorySchema);

module.exports = Category