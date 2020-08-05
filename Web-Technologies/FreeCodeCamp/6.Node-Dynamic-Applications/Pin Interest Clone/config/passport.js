/* jshint esversion: 6 */

const LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var configAuth = require('./auth');
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
//var TwitterStrategy  = require('passport-twitter').Strategy;

module.exports = function (passport) {
  // Local Strategy
  passport.use(new LocalStrategy(function (username, password, done) {
    // Match Username
    User.findOne({ 'local.username': username }, function (err, user) {
      if (err) throw err;
      if (!user.local) {
        return done(null, false, { message: 'No user found', type: "danger" });
      }

      // Match Password
      bcrypt.compare(password, user.local.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          console.log("bcrpty " + user.local);
          return done(null, user);
        } else {
          return done(null, false, { message: 'Wrong password', type: "danger" });
        }
      });
    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({

    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL,
    includeEmail: true
  },
    function (token, tokenSecret, profile, done) {
      // make the code asynchronous
      // User.findOne won't fire until we have all our data back from Twitter
      process.nextTick(function () {
        console.log(profile.id);
        User.findOne({ 'twitter.id': profile.id }, function (err, user) {
          console.log("the user we found " + user);
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
            return done(err);
          // if the user is found then log them in
          if (user) {
            return done(null, user); // user found, return that user
          } else {
            // if there is no user, create them
            var newUser = new User();
            console.log("new user " + newUser);
            // set all of the user data that we need
            newUser.twitter.id = profile.id;
            newUser.twitter.token = token;
            newUser.twitter.username = profile.username;
            newUser.twitter.displayName = profile.displayName;
            console.log("new user " + newUser);
            // save our user into the database
            newUser.save(function (err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }));
};