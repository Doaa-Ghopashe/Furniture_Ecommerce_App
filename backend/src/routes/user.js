const express= require('express'),
router= express.Router(),
controller = require('../controller/userController');

router.get('/',controller.profile);

router.put('/:id',controller.updateProfile);

router.post('/',controller.register);


module.exports = router;