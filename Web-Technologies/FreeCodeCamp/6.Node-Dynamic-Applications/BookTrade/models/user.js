/* jshint esversion: 6 */
const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    outstandingTrades: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    loanedBooks:[{}],
    traderequests:[{}],

    amountOfBooksLoaned: {
        type: Number,
        required: true,
    },
    maxLoanLimit:{
        type: Number,
        required: true,
    },
    dateCreated: {
        type: Date,
        required: true
    }
    
});


const User = module.exports = mongoose.model('User', UserSchema);