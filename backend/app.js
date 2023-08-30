const express = require('express');
const dbConnection = require('./config/db')
const userRoutes = require('./routes/userRoutes');

// Connecting to the Mongodb database
dbConnection();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});