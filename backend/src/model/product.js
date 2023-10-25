const mongoose = require('mongoose'),

    productSchema = new mongoose.Schema({
        name: String,
        category_Id: mongoose.Schema.Types.ObjectId,
        price: String,
        image: String,
        offer: Number,
        quantity: Number,
        avail: Boolean,
        details: String,
        colors: String
    })
        .pre('deleteOne', (next) => { }),

    product = mongoose.model('product', productSchema);

module.exports = product;