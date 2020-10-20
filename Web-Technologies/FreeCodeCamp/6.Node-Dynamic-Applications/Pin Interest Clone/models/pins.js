/* jshint esversion: 6 */

let mongoose = require('mongoose');

// Article schema
let pinSchema = mongoose.Schema({
    imageurl: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorid: {
        type: String,
        required: true
    },
    likes: {
        count: {
            type: Number, required: true
        },
        users: [
            {
                username: { type: String, required: true },
                userid: { type: String, required: true },
                dateliked: { type: Date, required: true }
            }
        ]
    },
    descriptions: {
        type: String,
        required: true
    },
    dateuploaded: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

let Pin = module.exports = mongoose.model('Pin', pinSchema);