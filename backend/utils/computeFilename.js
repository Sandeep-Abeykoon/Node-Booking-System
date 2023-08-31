const crypto = require('crypto');

const computeFilename = (email, filetype) => {
    // Hashing the email
    const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');

    // Forming the file name using the Hashed email and the file extension
    const fileExtension = filetype.split('/').pop();
    return `${hashedEmail}.${fileExtension}`;
}

module.exports = computeFilename;