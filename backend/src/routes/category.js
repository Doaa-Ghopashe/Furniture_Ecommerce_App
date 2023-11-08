const express = require('express'),

    router = express.Router(),

    multer = require('multer'),

    { newCategoryValidation, validate } = require('../middleware/validation'),

    { categoryMulterStorage, Filteration } = require('../middleware/upload'),

    controller = require('../controller/CategoryController'),

    upload = multer({
        storage: categoryMulterStorage, fileFilter: Filteration, limits: { fileSize: 1024 * 1024 }
    });

router.post('/add-category', upload.single('image'),newCategoryValidation(), validate, controller.addCategory);

router.get('/list-categories', controller.listCategories);

router.delete('/delete-category/:id', controller.deleteCategory);

router.put('/edit-category/:id', upload.single('image'), controller.editCategory);

module.exports = router