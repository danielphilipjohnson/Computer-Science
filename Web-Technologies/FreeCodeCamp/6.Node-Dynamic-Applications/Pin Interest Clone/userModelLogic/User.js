/* jshint esversion: 6 */

// Bring in User Model
let User = require('../models/user');

const bcrypt = require('bcryptjs');

// Improve comments 
// implement other functions

UserLogic = {
    // not implemented needstesting
    saveUserToMongo: function(user, req, res) {
        
        let defaultName = "default User";
        let defaultImage = "https://dummyimage.com/600x400/000/fff";

        let newUser = new User();
        newUser.local.name = defaultName;
        newUser.local.profilepic = defaultImage;
        newUser.local.username = user.username;
        newUser.local.password = user.password;

        newUser.save(function(err){
            if(err){
                return;
            } else {
                req.flash('success','You are now registered and can log in');
                res.render('index', {success: req.flash('success')}); //messages: req.flash('errors') 
            }
        });
    },
    generateUserPassword: function(plaintext){
        
        const saltRounds = 10;
        const hash = bcrypt.hashSync(plaintext, saltRounds);
        return hash;
    },

    // works well 
    validateUserForm: function(req){

        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        
        //description
        let errors = req.validationErrors();
        return errors;

    },
    fetchUserForm: function(req){

        const username = req.body.username;
        const password = req.body.password;

        return { username: username, password: password};
    },
    // Access Control
    ensureAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
        return next();
        } else {
        req.flash('danger', 'Please login');
        //res.render('/');
        res.render('index', {danger: req.flash('danger')}); //messages: req.flash('errors') 
        }
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