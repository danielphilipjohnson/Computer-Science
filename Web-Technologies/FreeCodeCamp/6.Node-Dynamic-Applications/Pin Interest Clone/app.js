/* jshint esversion: 6 */

// MIDDLE WARE
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// CONFIG
const config = require('./config/database');
var configAuth = require('./config/auth');
const UPLOAD_PATH = 'uploads';

// UPLOADING
const multer = require('multer');
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration

// CUSTOM LOGIC
const pinLogic = require('./boardAndpinModelLogic/boardpin.js');

// DB
mongoose.connect(config.database).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log("connected");
  },
  err => { /** handle initial connection error */
    console.log(err);
  }
);



// Init App
const app = express();

// Bring in Models
let Board = require('./models/boards');
let Pin = require('./models/pins');

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

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: false }
}));

// Express Messages Middleware
app.use(require('connect-flash')());


app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'), 
    root = namespace.shift(), 
    formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Home Route // WORKS with twitter
app.get('/', function (req, res) {

  pinLogic.fetchPinModels(req, res);
});


//  WORKS // WORKS with twitter
app.get('/explore', function (req, res) {
  Board
    .find({})
    .sort({ likes: -1 })
    .limit(10)
    .exec(function (err, boards) {
      if (err) {
        res.send(err);
        return next(err);
      }
      else {
        res.render('explore', { boards: boards, user: req.user });
      }
    });
});

// work on this route
app.get('/explore/:category', function (req, res) {
  Board
    .find({ 'category': req.params.category })
    .limit(10)
    .exec(function (err, boards) {
      if (err) {
        res.send(err);
        return next(err);
      }
      else {
        res.render('category', { boards: boards, user: req.user, category: req.params.category });
      }
    });
});


// board Route Works
app.get('/board/:id', function (req, res) {
  Board
    .findOne({ '_id': req.params.id })
    .exec(function (err, board) {
      if (err) {
        res.send(err);
        return next(err);
      }
      else {
        // deal with fail
        if (board.length === 0) {
          res.render('index', {});
        }
        else {
          res.render('boards', { board: board, user: req.user });
        }
      }
    });
});

// route for twitter authentication and login
app.get('/auth/twitter', passport.authenticate('twitter'));
// handle the callback after twitter has authenticated the user
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    //issue
    successRedirect: '/',
    failureRedirect: '/'
  }));

// Route Files
let pin = require('./routes/pin');
let users = require('./routes/users');

app.use('/pin', pin);
app.use('/users', users);

// Start Server
app.listen(8080, function () {
  console.log('Server started on port 8080...');
});