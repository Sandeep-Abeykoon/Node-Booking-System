const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    imageName: {
        type: String
        // image is not mandatory
    }
});

module.exports = mongoose.model('User', userSchema);