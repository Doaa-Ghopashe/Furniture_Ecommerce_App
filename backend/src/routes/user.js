const express= require('express'),
router= express.Router(),
controller = require('../controller/userController'),
auth = require('../middleware/auth');

// router.post('/register ',controller.register);

router.use(auth);

router.get('/',controller.profile);

router.put('/:id',controller.updateProfile);




module.exports = router;