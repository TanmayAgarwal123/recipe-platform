const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const recipeRoutes = require('./routes/recipes');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
app.use('/api/recipes', recipeRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// MongoDB connection
const MONGO_URI = 'mongodb+srv://tanmay10agarwal:Tanmay-123@cluster0.bjzfju8.mongodb.net/';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
