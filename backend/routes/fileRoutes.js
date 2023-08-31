const express = require('express');
const crypto = require('crypto');
const s3 = require('../config/s3');
require('dotenv').config();

const router = express.Router();

router.get('/get-presigned-url', async (req, res) => {
    const email = req.query.email;
    const filetype = req.query.filetype;

    // Checking if both file name and types are provoided
    if (!email || !filetype) {
        return res.status(400).send({ message: "Email and filetypes (extension) are needed" });
    }

    // Hashing the email
    const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

    // Forming the file name using the Hashed email and the file extension
    const fileExtension = filetype.split('/').pop();
    const filename = `${hashedEmail}.${fileExtension}`;

    // S3 bucket details
    const bucketName = process.env.BUCKET_NAME;
    const s3Params = {
        Bucket: bucketName,
        Key: filename,
        Expires: 60,
        ContentType: filetype,
        ACL: 'public-read'
    };

    // Generating the pre-signed URL
    try {
        const presignedUrl = s3.getSignedUrl('putObject',s3Params);
        const imageUrl = `https://${bucketName}.s3.amazonaws.com/${filename}`;

        return res.send({
            presignedUrl,
            imageUrl
        });
    } catch (error) {
        console.error('Error generating pre-signed URL : ', error);
        return res.status(500).send({ error: 'Internal Server Error (Failed to generate pre-signed URL)' });
    }
});

module.exports = router;


