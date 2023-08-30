const express = require('express');
const dbConnection = require('./config/db')

// Connecting to the Mongodb database
dbConnection();

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})