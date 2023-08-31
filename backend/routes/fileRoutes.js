const express = require('express');
const computeFilename = require('../utils/computeFilename');
const generatePresignedUrl = require('../utils/generatePresignedUrl');

const router = express.Router();

router.get('/get-presigned-url', async (req, res) => {
    const email = req.query.email;
    const filetype = req.query.filetype;

    // Checking if both file name and types are provoided
    if (!email || !filetype) {
        return res.status(400).send({ message: "Email and filetypes (extension) are needed" });
    }

    const filename = computeFilename(email, filetype);
    // Generating the pre-signed URL
    try {
        const presignedUrl = generatePresignedUrl(filename, filetype);

        return res.send({ presignedUrl, filename });
    } catch (error) {
        console.error('Error generating pre-signed URL : ', error);
        return res.status(500).send({ error: 'Internal Server Error (Failed to generate pre-signed URL)' });
    }
});


router.post('/get-image-url', async (req, res) => {
    const filename = req.body.imageName;
    console.log(filename);

    if (!filename) {
        return res.status(400).send({ message: "Filename is required" });
    }

    try {
        const presignedUrl = generatePresignedUrl(filename, null, 'getObject');
        res.send({ presignedUrl });
    } catch (error) {
        console.error('Error generating pre-signed URL : ', error);
        return res.status(500).send({ error: 'Internal Server Error (Failed to generate pre-signed URL)' });
    }
})

module.exports = router;


