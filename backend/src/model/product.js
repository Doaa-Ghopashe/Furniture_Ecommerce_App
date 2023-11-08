const mongoose = require('mongoose'),

    productSchema = new mongoose.Schema({
        name: String,
        category_Id: {type:mongoose.Schema.Types.ObjectId,ref:"Category"},
        price: String,
        images: Array,
        offer: Number,
        quantity: Number,
        avail: Boolean,
        details: String,
        colors: Array
    })
        .pre('deleteOne', (next) => { 
            
        }),

        
    product = mongoose.model('product', productSchema);

module.exports = product;