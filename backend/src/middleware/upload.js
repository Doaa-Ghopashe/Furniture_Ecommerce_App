const { appError } = require('../appError');

const multer = require('multer'),

    path = require('path'),

    multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../public/images/products')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }),

    Filteration = (req, file, cb) => {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new appError('Only images are allowed', 400));
        }
        cb(null, true)
    };

module.exports = { multerStorage, Filteration }