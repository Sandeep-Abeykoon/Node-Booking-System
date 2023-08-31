require('dotenv').config();
const s3 = require('../config/s3');

const generatePresignedUrl = (filename, filetype) => {
    const bucketName = process.env.BUCKET_NAME;
    const s3Params = {
        Bucket: bucketName,
        Key: filename,
        Expires: 60,
        ContentType: filetype
    };

    try {
        const presignedUrl = s3.getSignedUrl('putObject', s3Params);
        const imageUrl = `https://${bucketName}.s3.amazonaws.com/${filename}`;
        return { presignedUrl, imageUrl };
    } catch (error){
        console.error('Error generating pre-signed URL: ', error);
        throw new Error('Internal Server Error (Failed to generate pre-signed URL)');
    }
}

module.exports = generatePresignedUrl;