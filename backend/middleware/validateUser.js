const { check } = require('express-validator');

exports.validateUserRegistration = [
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('mobileNumber', 'Mobile Number is required').notEmpty(),
    check('email', 'Email is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
]; 