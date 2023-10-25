let express = require('express'),

    controller = require('../controller/productController'),

    multer = require('multer'),

    { newProductValidation, validate } = require('../middleware/validation'),

    { multerStorage, Filteration } = require('../middleware/upload'),

    router = express.Router(),

    upload = multer({ storage: multerStorage, fileFilter: Filteration, limits: { fileSize: 1024 * 1024 } });

router.get('/', () => { })

router.post('/add-product', newProductValidation(), validate, upload.single('image'), controller.addProduct)

module.exports = router