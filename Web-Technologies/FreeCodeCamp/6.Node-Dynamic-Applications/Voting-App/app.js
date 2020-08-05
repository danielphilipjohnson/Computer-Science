/* jshint esversion: 6 */

// Core dependencies
const path = require('path');

// Node Dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Custom logic
const config = require('./config/database');

//Models Poll
let Poll = require('./models/polls');

// Dealing with polls
const pollLogic = require('./pollsModelLogic/Poll.js');

// SETUP DB
mongoose
  .connect(config.database)
  .then(() => {/** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log("connected");
  }, err => {/** handle initial connection error */
    console.log(err);
  });

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {param: formParam, msg: msg, value: value};
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Every path get user if possible
app.get('*', function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Home Route
app.get('/', function (req, res) {
  pollLogic.displayRecentPolls(res);
});



// Home Route
app.post('/', function (req, res) {
  let anyErrors = pollLogic.validatePoll(req);

  if (anyErrors) {
    // does nothing
    res.redirect('/', {polls: {}});
  } else {
    console.log("alls okay");
    let Poll = pollLogic.fetchPoll(req.body);

    if (req.user === undefined) {
      //console.log("no user");
      pollLogic.createPoll(Poll, "guest", req);
      res.redirect('/');
    } else {
      let username = req.user.name;
      pollLogic.createPoll(Poll, username, req, res);
      res.redirect('/');

    }
  }
});


app.delete('/:id', function (req, res) {
  
    let query = {
      _id: req.params.id
    };
  
    Poll.findById(req.params.id, function (err, poll) {
      Poll
        .remove(query, function (err) {
          if (err) {
            console.log(err);
          }
          res.send('Success');
  
        });
    });
});



// Route Files
let alerts = require('./routes/alerts');
let addquestion = require('./routes/addquestion');

// try to refactor Only thing that changes is file to display
let barchart = require('./routes/barchart');
let doughnutchart = require('./routes/doughnutchart');
let linechart = require('./routes/linechart');
let piechart = require('./routes/piechart');

let categories = require('./routes/categories');
let category = require('./routes/category');
let profile = require('./routes/profile');
let users = require('./routes/users');
let vote = require('./routes/vote');

app.use('/alerts', alerts);
app.use('/addquestion', addquestion);
app.use('/categories', categories);
app.use('/category', category);
app.use('/profile', profile);
app.use('/users', users);
app.use('/vote', vote);

// Chart routes
app.use('/barchart', barchart);
app.use('/doughnutchart', doughnutchart);
app.use('/linechart', linechart);
app.use('/piechart', piechart);

// Start Server
app.listen(3000, function () {
  console.log('Server started on port 3000...');
});