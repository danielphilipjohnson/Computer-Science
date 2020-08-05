let mongoose = require('mongoose');
// npm install uuid

const uniqueValidator = require('mongoose-unique-validator');
// Url schema
let issueTrackerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
        unique: true
    },
    date_created: {
        type: Date,
        required: true
    },
    assigned_to: {
        type: String

    },
    last_updated: {
        type: Date
    },
    closed: {
        type: Boolean
    }

});

issueTrackerSchema.plugin(uniqueValidator);

let issueTracker = module.exports = mongoose.model('urls', issueTrackerSchema);