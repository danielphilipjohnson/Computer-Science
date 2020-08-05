/* jshint esversion: 6 */
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

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
let Bar = require('./models/bar');
let User = require('./models/user');

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
  saveUninitialized: true
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


// Home Route
app.get('/', function (req, res) {
  // user logged in showed them there saved bars
  if (req.user) {
    User
      .findById(req.user._id)
      // change eventually
      .sort({ barName: 'ascending' })
      .limit(10)
      .exec(function (err, user) {
        if (err) {
          res.send(err);
          return next(err);
        }
        else {
          res.render('index', { bars: user.savedbars });
        }
      });
  }
  else {
    res.render('index');
  }
});

// post save posts
app.post('/savebars', function (req, res) {

  const venuename = req.body.venuename;
  const address = req.body.address;
  const state = req.body.state;
  const phone = req.body.phone;


  req.checkBody('venuename', 'venuename is required').notEmpty();
  req.checkBody('address', 'address is required').notEmpty();
  req.checkBody('state', 'state is required').notEmpty();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      var errors = result.array().map(function (elem) {
        return elem.msg;
      });
      //console.log('There are following validation errors: ' + errors.join(' && '));
      // in the future res.render('register', { errors: errors });
    } else {
      // go to save it 
      let newBar = new Bar({
        barName: venuename,
        address: address,
        state: state,
        phoneNumber: phone,
        attending: false,
      });

      // get the user 
      User.findById(req.user._id, function (err, user) {
        user.savedbars.push(newBar);
        user.save(function (err, updatedBar) {
          if (err) return handleError(err);
        });
      });
    }
  });
});


app.post('/attending', function (req, res) {
  const barname = req.body.barname;

  req.checkBody('barname', 'id is required').notEmpty();

  req.getValidationResult().then(function (result) {

    if (!result.isEmpty()) {
      var errors = result.array().map(function (elem) {
        return elem.msg;
      });
      //console.log('There are following validation errors: ' + errors.join(' && '));
      // in the future res.render('register', { errors: errors });
    } else {

      // get the user 
      User.findById(req.user._id, function (err, user) {
        if (err) {
          //res.status(500).send(err);
        }

        for (var i = 0; i < user.savedbars.length; i++) {
          if (barname === user.savedbars[i].barName) {
            user.savedbars[i].attending = true;
            user.save((err, updatedUser) => {
              res.send(updatedUser);
            });
          }
        }
      });
    }
  });
});
app.post('/notattending', function (req, res) {

  const barname = req.body.barname;

  req.checkBody('barname', 'id is required').notEmpty();

  req.getValidationResult().then(function (result) {

    if (!result.isEmpty()) {
      var errors = result.array().map(function (elem) {
        return elem.msg;
      });
      //console.log('There are following validation errors: ' + errors.join(' && '));
      // in the future res.render('register', { errors: errors });
    } else {
      // get the user 
      User.findById(req.user._id, function (err, user) {
        if (err) {
          //res.status(500).send(err);
        }
        for (var i = 0; i < user.savedbars.length; i++) {
          if (barname === user.savedbars[i].barName) {
            user.savedbars[i].attending = false;
            user.save((err, updatedUser) => {
              res.send(updatedUser);
            });
          }
        }
      });
    }
  });
});
app.post('/remove', function (req, res) {
  
  const barname = req.body.barname;

  req.checkBody('barname', 'id is required').notEmpty();

  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      var errors = result.array().map(function (elem) {
        return elem.msg;
      });

      //console.log('There are following validation errors: ' + errors.join(' && '));
      // in the future res.render('register', { errors: errors });
    } else {
      // get the user 
      User.findById(req.user._id, function (err, user) {
        if (err) {
          //res.status(500).send(err);
        }
        for (var i = 0; i < user.savedbars.length; i++) {
          if (barname === user.savedbars[i].barName) {
            user.savedbars.splice(i, 1);
            user.save(function (err, updatedUser) {
              //res.send(updatedUser); 
            });
          }
        }
      });
    }
  });

});

// Route Files
let users = require('./routes/users');
app.use('/users', users);

// Start Server
app.listen(3000, function () {
  console.log('Server started on port 3000...');
});