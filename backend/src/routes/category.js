const express = require('express'),

    router = express.Router(),

    CategoryController = require('../controller/CategoryController');

router.post('add-category', CategoryController.addCategory());

router.get('list-categories', CategoryController.listCategories());

router.delete('delete-category', CategoryController.deleteCategory());

router.put('edit-category', CategoryController.editCategory());

module.exports = router