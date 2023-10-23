const { appError } = require('../appError');
const categoryModel = require('../model/category');
const { tryCatch } = require('../utlis/tryCatch');

let addCategory = tryCatch(async (req, res) => {
    const { name } = req.body;

    if (!name)

        throw new appError('Category name not found', 400);

    const oldName = await categoryModel.find({ name });

    if (oldName.length > 0)
        throw new appError('This category is already added', 400)

    let Category = await categoryModel.create({ name });

    Category.save();

    res.status(200).json({
        message: 'Category has been added successfully'
    });
})

let editCategory = () => {
    return;
}

let deleteCategory = () => {
    return;
}

let listCategories = tryCatch(async(req,res) => {
    let Categories = await categoryModel.find();
    
    if(Categories.length <= 0){
        throw new appError('There is no data to be displayed',400)
    }

    res.status(200).json({
        data:{Categories},
        message:"Categories found"
    });
})

module.exports = { addCategory, editCategory, deleteCategory, listCategories }