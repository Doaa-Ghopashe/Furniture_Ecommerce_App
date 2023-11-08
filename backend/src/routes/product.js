let express = require('express'),

    controller = require('../controller/productController'),

    multer = require('multer'),

    { newProductValidation, validate } = require('../middleware/validation'),

    { productMulterStorage, Filteration } = require('../middleware/upload'),

    router = express.Router(),

    upload = multer({ storage: productMulterStorage, fileFilter: Filteration, limits: { fileSize: 1024 * 1024 }});
    
router.get('/', controller.listProducts)

router.post('/add-product', upload.array('images',4) , newProductValidation(), validate, controller.addProduct);

router.delete('/delete-product/:id', controller.deleteProduct)

router.put('/edit-product/:id', upload.array('images',4), controller.editProduct)

module.exports = router