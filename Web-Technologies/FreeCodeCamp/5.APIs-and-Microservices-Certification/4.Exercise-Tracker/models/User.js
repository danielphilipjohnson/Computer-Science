/* jshint esversion: 6 */

const mongoose = require('mongoose');


// Poll schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },

    date_created: { type: Date, require: true },
});

const User = module.exports = mongoose.model('User', userSchema);