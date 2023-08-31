require('dotenv').config();
const AWS = require('aws-sdk');

// Setting up the S3 connection
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION || 'eu-west'
});

module.exports = s3;