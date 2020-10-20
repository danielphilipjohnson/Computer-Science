/*
  Made By Daniel Philip Johnson: UndreamtMayhem
  CodePen https://codepen.io/undreamtmayhem/
  github: https://github.com/UndreamtMayhem
*/

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const config = require('./config/database');


mongoose.connect(config.database).then(
  () => { 
      console.log("connected");
      
    },
  err => { 
      console.log(err);}
);


// Init App
const app = express();

// Bring in Models

let Urls = require('./models/urls');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));



// Home Route
app.get('/', function(req, res){
  //tempted to add recent searches 
  res.render('index');
});

// Route Files
let url = require('./routes/url');
app.use('/', url);

// Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});