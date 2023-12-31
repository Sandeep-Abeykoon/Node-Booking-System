const mongoose = require('mongoose');
require('dotenv').config();

// Setting up the mongodb connection
const dbConnection = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        process.exit(1);
    }
}
module.exports = dbConnection;