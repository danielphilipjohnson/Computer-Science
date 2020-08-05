/* jshint esversion: 6 */
let mongoose = require('mongoose');

// Book schema
let bookSchema = mongoose.Schema({

    author: {
        type: String,
        required: true
    },
    availableAmountToUpload: {
        type: Number,
        required: true
    },
    bookCover: {
        type: String,
        required: true
    },
    borrowedBy: {
        users: [{
            type: String,
            required: true
        }]
    },
    category: {
        type: String,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true
    },
   
    publishers:
    {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    timesBorrowed: {
        type: Number,
        required: true
    },
   
    uploader: {
        userid:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    year: {
        type: String,
        required: true
    },
});

let Book = module.exports = mongoose.model('Book', bookSchema);