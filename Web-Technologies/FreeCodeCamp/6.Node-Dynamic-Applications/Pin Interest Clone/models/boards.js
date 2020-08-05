/* jshint esversion: 6 */

let mongoose = require('mongoose');

let boardSchema =  mongoose.Schema({

            authorId: {type: String, required: true},
            secret: {type:Boolean, required: true},
            name: {type: String, required: true},
            count: {type: Number, required: true},
            //popularity formula
            likes: {type: Number, required: true},
            //reference of id
            pins: [],
            category: {
                type: String,
                required: true
            },
});

let Board = module.exports = mongoose.model('Board', boardSchema);