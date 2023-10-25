const productModel = require('../model/product'),
    { tryCatch } = require('../utlis/tryCatch'),
    { appError } = require('../appError'),
    categoryModel = require('../model/category');

let addProduct = tryCatch(async (req, res) => {
    const { name, category, image, price, offer, quantity, colors, details } = req.body
    //
    let foundOrNot = await categoryModel.findOne({name:category});
    //
    if(!foundOrNot)
        throw new appError('Category doesn\'t exist',422);
    //
    // console.log(foundOrNot._id)
    //
    // productModel.create({...req.body,
    //     category_Id:foundOrNot._id,
        
    // })


})

let editProduct = tryCatch(async (req, res) => {
})

let listProducts = tryCatch(async (req, res) => {
})

let deleteProduct = tryCatch(async (req, res) => {
})

module.exports = { addProduct, editProduct, listProducts, deleteProduct }