const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo db connection established successfully!');
})

const users_routes = require('./routes/users');
const exercises_routes = require('./routes/exercises');
app.use('/users', users_routes);
app.use('/exercises', exercises_routes);

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
})