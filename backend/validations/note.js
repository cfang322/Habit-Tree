const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');


const validateNoteInput = [
  check('content')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Note must be longer than 6 characters'),
  handleValidationErrors
];



module.exports = validateNoteInput