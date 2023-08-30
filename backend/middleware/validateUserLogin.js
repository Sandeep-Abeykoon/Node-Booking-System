const { check } = require('express-validator');

exports.validateUserLogin = [
    check('email', 'Email is required').notEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').notEmpty()
];