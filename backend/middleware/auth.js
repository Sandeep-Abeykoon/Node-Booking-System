const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return (
            res.status(401).send('Access denied. No token provided')
        );
    }
    
    try {
        const decodedPayload = jwt.verify(token, process.env.JWT_KEY);
        req.user = decodedPayload;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}