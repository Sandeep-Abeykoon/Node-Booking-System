const express = require ('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { validationResult } = require('express-validator');
const validateUserRegistration = require('../middleware/validateUser');
const errorHandler = require('../middleware/errorHandler');

const router = express.Router();

router.post('/register', validateUserRegistration, async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Checking whether the user already exists
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).send('User already registered');
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Creating a new user
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobileNumber: req.body.mobileNumber,
            email: req.body.mobileNumber,
            email: req.body.email,
            password: hashedPassword,
            image: req.body.image
        });

    } catch (error) {
        
    }
})