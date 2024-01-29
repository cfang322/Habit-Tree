const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateHabitInput = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name is invalid'),
  check('category')
    .exists({ checkFalsy: true })
    .withMessage('Category is invalid'),
  check('habitType')
    .exist({ checkFalsy: true })
    .withMessage('Type must be checked'),
  handleValidationErrors
];

module.exports = validateHabitInput