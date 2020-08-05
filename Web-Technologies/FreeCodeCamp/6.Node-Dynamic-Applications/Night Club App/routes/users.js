/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// custom logic modules
const userLogic = require('../userModelLogic/User.js');

// Bring in User Model
let User = require('../models/user');

// Register Proccess
router.post('/register', function (req, res) {

  // check errors
  let anyErrors = userLogic.validateUserForm(req);

  if (anyErrors) {
    res.render('index', {
      //errors:anyErrors
    });

  } else {
    // get the user from the form as it is validated
    let user = userLogic.fetchUserForm(req);
    // check if user exists
    User.findOne({ 'username': user.username }, function (err, person) {
      if (err) return handleError(err);
      else {
        if (person != null) {
          // username exists
          res.redirect('/failed');
        }
        else {
          // person doesnt exist create him       
          // generate the password 
          let cryptedPassword = userLogic.generateUserPassword(user.password);
          // set password
          user.password = cryptedPassword;
          // save the user to mongo
          // redirect user to login  
          userLogic.saveUserToMongo(user, req, res);
        }
      }
    });
  }
});

// Login Process
router.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/fffggd',
    failureFlash: true
  })(req, res, next);

});

// logout
router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/');
});


module.exports = router;