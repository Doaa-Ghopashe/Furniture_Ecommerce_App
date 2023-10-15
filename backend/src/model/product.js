const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    name:{type:String},
    category:{type:String},
    price:{type:String},


}),
product = mongoose.Model('product',productSchema);

module.exports = product;