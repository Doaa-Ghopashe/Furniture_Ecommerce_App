const express= require('express'),

    router= express.Router(),

    controller = require('../controller/userController'),

    auth = require('../middleware/auth');

router.post('/register',controller.register);

router.post('/login',controller.login);

router.get('/profile',auth,controller.profile);

router.put('/profile',auth,controller.updateProfile);

router.get('/user/verify/:userId/:uniqueStr',controller.verify);

router.post('/password/reset/:userId/:uniqueStr',controller.sendPasswordResetEmail);

module.exports = router;