const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://eman:12345@cluster0.m3rmoqm.mongodb.net/"
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongo db connection established successfully!');

    const users_routes = require('./routes/users');
    const exercises_routes = require('./routes/exercises');
    app.use('/users', cors(), users_routes);
    app.use('/exercises', cors(), exercises_routes);

    app.use(express.static(path.resolve(__dirname, '../client/build')));
    // All other GET requests not handled before will return our React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
});

module.exports = app; // Export the app for testing



