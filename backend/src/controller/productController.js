const productModel = require('../model/product');
const { tryCatch } = require('../utlis/tryCatch');
const { appError } = require('../appError');


let addProduct = tryCatch(async (req, res) => {
    const { name, category, image, price, offer, quantity, colors, details } = req.body
    //
    if (!(name && category && image && price && offer && quantity && colors && details)) {
        throw new appError('All Inputs should be entered', 400);
    }
    //
    

})

let editProduct = tryCatch(async (req, res) => {
})

let listProducts = tryCatch(async (req, res) => {
})

let deleteProduct = tryCatch(async (req, res) => {
})

module.exports = { addProduct, editProduct, listProducts, deleteProduct }