/* jshint esversion: 6 */
// TODO implement other functions

// Bring in User Model
let User = require('../models/user');

const bcrypt = require('bcryptjs');

UserLogic = {
    // not implemented needstesting
    loginUser: function(password, User) {
      bcrypt.compare(password, User.password, function(err, isMatch){
        if(err) throw err;
        
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    },
    saveUserToMongo: function(user, req, res) {
        
        let newUser = new User({
                                username:user.username,
                                password:user.password,
                                savedbars: {attending: false,
                                    phoneNumber: 'P:',
                                    state: 'example',
                                    address: '954 W Belmont Ave',
                                    barName: 'Berlin Nightclub' }
        });
        newUser.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                    req.flash('success','You are now registered and can log in');
                    res.redirect('/');
            }
        });
    },
    generateUserPassword: function(plaintext){
        const saltRounds = 10;
        const hash = bcrypt.hashSync(plaintext, saltRounds);
        return hash;
    },

    // works well 
    // Get fields sent via post
    validateUserForm: function(req){

        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
    
        //description
        let errors = req.validationErrors();
        return errors;
    },
    // Get fields sent via post
    fetchUserForm: function(req){

        const username = req.body.username;
        const password = req.body.password;
        return { username: username, password: password};
    },
    //not implemented
     deleteUser: function() {
        return "    implement";
    },
    //not implemented
     editUser: function() {
        return "    implement";
    }
  };

  module.exports = UserLogic;