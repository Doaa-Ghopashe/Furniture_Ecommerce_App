const express = require('express'),

    router = express.Router(),

    controller = require('../controller/CategoryController');

router.post('/add-category', controller.addCategory);

router.get('/list-categories', controller.listCategories);

router.delete('/delete-category', controller.deleteCategory);

router.put('/edit-category', controller.editCategory);

module.exports = router