const express = require ('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const { validationResult } = require('express-validator');
const validateUserRegistration = require('../middleware/validateUser');
const errorHandler = require('../middleware/errorHandler');

const router = express.Router();

