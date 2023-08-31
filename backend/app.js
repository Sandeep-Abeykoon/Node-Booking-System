const express = require('express');
require('dotenv').config();
const cors = require('cors');
const dbConnection = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

// Connecting to the Mongodb database
dbConnection();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});