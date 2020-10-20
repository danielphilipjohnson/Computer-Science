/* jshint esversion: 6 */

// TODO test

let User = require('../User');



UserLogic = {


    // Create a new User save to mongo 
    createUser: function(user, req, res) {

        let newUser = new User({ username: user.username, date_created: new Date() });

        newUser
            .save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                } else {

                    res.redirect('/');

                }
            });
    },

    // Fetch an indivdual user
    fetchUserForm: function(req) {

        let User = {};

        User.username = req.body.username;

        return User;

    },

};

module.exports = UserLogic