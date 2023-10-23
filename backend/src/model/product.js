const mongoose = require('mongoose'),

    productSchema = new mongoose.Schema({
        name:{type:'string'},
        category:{type:'string'},
        price:{type:'string'},
        image:{type:String},
        offer:{type:Number},
        quantity:{type:Number},
        avail:Boolean,
        details:{type:String},
        colors:{type:String}
    }),
    product = mongoose.model('product', productSchema);

module.exports = product;