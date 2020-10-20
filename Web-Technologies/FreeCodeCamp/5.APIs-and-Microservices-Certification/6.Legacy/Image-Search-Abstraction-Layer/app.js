/*
  Made By Daniel Philip Johnson: UndreamtMayhem
  CodePen https://codepen.io/undreamtmayhem/
  github: https://github.com/UndreamtMayhem
*/

const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const config = require('./config/keys');
const mongoose = require('mongoose');

// // Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
//var uri = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;
mongoose.connect(config.database).then(
  () => { 
      console.log("connected");
    },
  err => { 
      console.log(err);}
);


// Init App
const app = express();


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
  res.render('index');
});



/*
// Additional 
app.get('api/imagesearch/:image*', function(req, res){
  // test route works  
  res.json({'image': req.params.image,'offset': req.query});

 
});
*/



// Route Files Test
let imageSearch = require('./routes/imageSearch');
app.use('/', imageSearch);
let recentSearch = require('./routes/recentSearch');
app.use('/', recentSearch);


// Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});