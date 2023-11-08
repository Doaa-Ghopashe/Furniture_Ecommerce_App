let imgList = [];

const { appError } = require('../appError'),

    multer = require('multer'),

    path = require('path'),

    productMulterStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../public/images/products')
        },
        filename: (req, file, cb) => {
            if (!req.imgList) {
                req.imgList = []; // Create imgList array if it doesn't exist
            }
    
            const filename = Date.now() + path.extname(file.originalname);
            req.imgList.push('public/images/products/' + filename);
            req.body['images'] = req.imgList;
            cb(null, filename)
        }
    }),

    categoryMulterStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../public/images/category')
        },
        filename: (req, file, cb) => {
            filename = Date.now() + path.extname(file.originalname);
            req.body['image'] = 'public/images/category/'+filename
            cb(null, filename)
        }
    }),

    Filteration = (req, file, cb) => {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new appError('Only images are allowed', 400));
        }
        cb(null, true)
    };

module.exports = { productMulterStorage, Filteration, categoryMulterStorage }