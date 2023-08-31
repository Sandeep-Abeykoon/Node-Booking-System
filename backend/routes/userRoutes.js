const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

const authenticate = require('../middleware/auth');

const { validationResult } = require("express-validator");
const {validateUserRegistration} = require("../middleware/validateUserRegistration");
const { validateUserLogin } = require("../middleware/validateUserLogin");
const errorHandler = require("../middleware/errorHandler");

const router = express.Router();

// User Registration route
router.post("/register", validateUserRegistration, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Checking whether the user already exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already registered with this username" });
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
      imageName: req.body.imageName,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    next(error); // Passing the error to the error handling middleware
  }
});

// user login route
router.post("/login", validateUserLogin, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Checking whether the user exists
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist. Please check your username" });
    }

    // Checking the validity of the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Password Incorrect" });
    }

    // Generating the JWT
    const tokenPayload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(tokenPayload, process.env.JWT_KEY, (err, token) => {
      if (err) {
        console.error("Error signing the token", err);
        return res.status(500).json({ msg: "Server error" });
      }
      res.status(200).json({ token, userId : user.id, message: "User logged in successfully!" });
    });
  } catch (error) {
    next(error);
  }
});


// Getting User Data
router.get('/user-data', async (req, res) => {
  try {
    console.log("im up")
    const user = await User.findById(req.userId).select('-_id -password');
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data ", error);
    console.log(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.use(errorHandler);

module.exports = router;
