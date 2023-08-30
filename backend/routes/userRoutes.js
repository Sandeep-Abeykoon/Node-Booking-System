const express = require ('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/User');

const { validationResult } = require('express-validator');
const {validateUserRegistration} = require('../middleware/validateUserRegistration');
const { validateUserLogin } = require('../middleware/validateUserLogin');
const errorHandler = require('../middleware/errorHandler');

const router = express.Router();

// User Registration route
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
            email: req.body.email,
            password: hashedPassword,
            image: req.body.image
        });

        await user.save();
        res.send('User registered successfully!');

    } catch (error) {
        next (error)      // Passing the error to the error handling middleware
    }
});



// user login route
router.post('login', validateUserLogin, async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return(
            res.status(400).json({ errors: errors.array() })
        );
    }
    try {
        // Checking whether the user exists
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        // Checking the validity of the password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
    
        if (!validPassword) {
            return res.status(400).send('Invalid email or password');
        }

        // Generating the JWT
        const tokenPayload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_KEY);  // No token expiration specified as this is a test project

        // Sending the JWT token
        res.json({ token });

    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

module.exports = router;