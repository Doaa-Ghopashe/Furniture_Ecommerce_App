const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({

}),
product = mongoose.Model('product',productSchema);

module.exports = product;