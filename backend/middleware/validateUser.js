const { check } = require('express-validator');

exports.validateUserRegistration = [
    check('firstName', 'First name is required').notEmpty(),
    
]