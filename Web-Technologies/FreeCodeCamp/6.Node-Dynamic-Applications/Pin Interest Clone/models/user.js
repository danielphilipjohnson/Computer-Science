/* jshint esversion: 6 */

const mongoose = require('mongoose');

// User Schema

const UserSchema = mongoose.Schema({
    // add more own generator
    local: {
        name: {
            type: String,
        },
        profilepic: {
            type: String,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
        }
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

const User = module.exports = mongoose.model('User', UserSchema);