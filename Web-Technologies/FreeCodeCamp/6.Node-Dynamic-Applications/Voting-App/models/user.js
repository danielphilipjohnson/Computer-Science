/* jshint esversion: 6 */
const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
   
    password: {
        type: String,
        required: true,
    },
});


const User = module.exports = mongoose.model('User', UserSchema);