const { check, validationResult } = require('express-validator'),

  newProductValidation = () => {
    return [
      check('name')
        .trim().escape()
        .notEmpty().withMessage('It should exist')
        .isString()
        .matches(/^[A-Z a-z]/g).withMessage('It should be string that starts with letter')
        .isLength({ min: 3, max: 14 }).withMessage('It\'s length should be between 5 and 14'),

      check('price')
        .notEmpty().withMessage('It should be exist')
        .isInt({ gt: 49, lt: 100001 }).withMessage('Price is a number between 50 and 100000'),

      check('offer')
        .notEmpty().withMessage('Offer should have value')
        .isFloat({ gt: -1, ls: 0 }).withMessage('Offer is a decimal number between 0 and 1'),

      check('images')
        .notEmpty().withMessage('Image doesn\'t exist'),

      check('colors')
        .notEmpty().withMessage('Colors should exist')
        .custom((colors) => {
          let flag = false
          JSON.parse(colors).map((clr) => {
            flag = clr.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/g) ? true : false;
          })
          return flag;
        }).withMessage('There is a color that does not follow the colors pattern'),
        
      check('quantity')
        .trim().escape()
        .notEmpty().withMessage('quantity should be exist')
        .isInt({ gt: -1, ls: 1001 }).withMessage('quantity between 0 and 1000'),

      check('details')
        .trim().escape()
        .notEmpty().withMessage('Description should exist')
        .isString(),

      check('category')
        .trim()
        .escape()
        .notEmpty().withMessage('You should include the product to one of the existing categories')
    ];
  },

  updatedProductValidation = () => {
    return [
      check('name')
        .trim().escape()
        .notEmpty().withMessage('It should exist')
        .isString()
        .matches(/^[A-Z a-z]/g).withMessage('It should be string that starts with letter')
        .isLength({ min: 3, max: 14 }).withMessage('It\'s length should be between 5 and 14'),

      check('price')
        .notEmpty().withMessage('It should be exist')
        .isInt({ gt: 49, lt: 100001 }).withMessage('Price is a number between 50 and 100000'),

      check('offer')
        .notEmpty().withMessage('Offer should have value')
        .isFloat({ gt: -1, ls: 0 }).withMessage('Offer is a decimal number between 0 and 1'),

      check('image')
        .trim().escape()
        .notEmpty().withMessage('Image doesn\'t exist'),

      check('colors')
        .trim().escape()
        .notEmpty().withMessage('Colors should exist')
        .isString(),

      check('quantity')
        .trim().escape()
        .notEmpty().withMessage('quantity should be exist')
        .isInt({ gt: -1, ls: 1001 }).withMessage('quantity between 0 and 1000'),

      check('details')
        .trim().escape()
        .notEmpty().withMessage('Description should exist')
        .isString(),

      check('category')
        .trim().escape()
        .notEmpty().withMessage('You should include the product to one of the existing categories'),
    ];
  },

  newCategoryValidation = () => {
    return [
      check('name')
        .trim().escape()
        .notEmpty().withMessage('It should exist')
        .isString()
        .matches(/^[A-Z a-z]/g).withMessage('The name should start with letter')
        .isLength({ min: 3, max: 14 }).withMessage('Name characters should be between 5 and 14')
        .customSanitizer((name)=>{
          return name.toLowerCase();
        }),
      
      check('image')
        .notEmpty().withMessage('It should exist')
    ];
  },

  updatedCategoryValidation = () => {
    return [
      check('name')
        .trim().escape()
        .notEmpty().withMessage('It should exist')
        .isString()
        .matches(/^[A-Z a-z]/g).withMessage('It should be string that starts with letter')
        .isLength({ min: 3, max: 14 }).withMessage('It\'s length should be between 5 and 14'),
    ];
  },

  validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push(err.msg))

    return res.status(422).json({
      message:extractedErrors[0]
    })
  }

module.exports = {
  newProductValidation,
  updatedProductValidation,
  newCategoryValidation,
  updatedCategoryValidation,
  validate
}