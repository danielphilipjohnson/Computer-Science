/* jshint esversion: 6 */
const mongoose = require('mongoose');

// User Schema
const ExerciseSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,

    },
    date: {
        type: Date,
        required: true,

    },
});


const Exercise = module.exports = mongoose.model('Exercise', ExerciseSchema);