const express = require ('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();