require('dotenv').config();
const s3 = require('../config/s3');

const generatePresignedUrl = (filename, filetype, operation = 'putObject') => {
    const bucketName = process.env.BUCKET_NAME;

    const s3Params = {
        Bucket: bucketName,
        Key: filename,
        Expires: 120,    //Expiry time
    };

    if (operation === 'putObject') {
        s3Params.ContentType = filetype;
    }

    try {
        const presignedUrl = s3.getSignedUrl(operation, s3Params);
        return  presignedUrl;
        
    } catch (error){
        console.error('Error generating pre-signed URL: ', error);
        throw new Error('Internal Server Error (Failed to generate pre-signed URL)');
    }
}

module.exports = generatePresignedUrl;