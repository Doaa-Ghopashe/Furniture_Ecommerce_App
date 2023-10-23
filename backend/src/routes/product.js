let express = require('express'),
    controller = require('../controller/productController'),
    router = express.Router();

router.get('/', () => { })

router.post('/add-product', controller.addProduct)

module.exports = router