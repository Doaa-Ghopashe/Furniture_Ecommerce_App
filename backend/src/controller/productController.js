const productModel = require('../model/product'),
    { tryCatch } = require('../utlis/tryCatch'),
    { appError } = require('../appError'),
    categoryModel = require('../model/category');

let addProduct = tryCatch(async (req, res) => {
    const {category,colors,quantity} = req.body
    //
    let foundOrNot = await categoryModel.findOne({name:category});
    //
    if(!foundOrNot)
        throw new appError('Category doesn\'t exist',422);

    avail =  (quantity > 0) ? true : false;

    productModel.create({...req.body,colors:JSON.parse(colors),
        category_Id:foundOrNot._id,
        avail});

    res.status(200).json({
        message:'Product saved Successfully'
    })

})

let editProduct = tryCatch(async (req, res) => {
})

let listProducts = tryCatch(async (req, res) => {
    let Products = await productModel.find().populate("category_Id");

    if(Products.length > 0){
        res.status(200).json({
            data:{Products},
            message:'Products found'
        })
    }else{
        throw new appError('There is no products',422)
    }
})

let deleteProduct = tryCatch(async (req, res) => {
    let {id} = req.params;
    
    //make sure that there is an id with the request url
    if(!id){
        throw new appError('There is no information about the product with the request',422)
    }

    //find the product with this Id
    let result = productModel.findByIdAndDelete({_id:id});

    if(result){
        res.status(200).json({
            message:'The product deleted successfully'
        })
    }else{
            throw new appError('The product doesn\'t exist',422)
    }

})

module.exports = { addProduct, editProduct, listProducts, deleteProduct }