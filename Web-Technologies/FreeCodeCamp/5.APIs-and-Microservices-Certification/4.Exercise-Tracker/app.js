/* jshint esversion: 6 */

// Core dependencies
const path = require('path');

// Node Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config/database');


//Models 
let User = require('./models/User')

// SETUP DB
mongoose
    .connect(config.database)
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
        console.log("connected");
    }, err => {
        /** handle initial connection error */
        console.log(err);
    });


// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));


// routes
let newUser = require('./routes/newUser');
let logs = require('./routes/logs');
let addExercise = require('./routes/addExercise');
let index = require('./routes/index');


app.use('/', index);
app.use('/api/exercise/log', logs);
app.use('/api/exercise/add', addExercise);
app.use('/api/exercise/new-user', newUser);


// Start Server
app.listen(3000, function() {
    console.log('Server started on port 3000...');
});