/* jshint esversion: 6 */

const mongoose = require('mongoose');


// Poll schema
const pollSchema = mongoose.Schema({
    author:{
        type: String,
        require: true,
    },
    category:{
        type: String,
        require: true,
    },
    question:{
        type: String,
        require: true
    },
    answers:[{
        answer: String,
        stats: {
            users: [],
            votes: Number,     
        },
    }],
    date_uploaded: {type: Date, require: true},
});

const Poll = module.exports = mongoose.model('Poll', pollSchema);