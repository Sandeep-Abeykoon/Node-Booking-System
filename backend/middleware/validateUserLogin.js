const { check } = require('express-validator');

exports.validateUserLogin = [
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('password', 'Password should be at least 8 characters long').isLength({ min: 8 })
];