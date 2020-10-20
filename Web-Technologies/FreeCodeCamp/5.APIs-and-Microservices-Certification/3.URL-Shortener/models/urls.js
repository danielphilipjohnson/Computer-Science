let mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// Url schema
let urlSchema =  mongoose.Schema({
    long_url:{
        type: String,
        required: true,
        unique: true
    },
    short_code:{
        type: String,
        required: true,
        unique: true
    },
    date_created:{
        type: Date,
        required: true
    }
});
urlSchema.plugin(uniqueValidator);
let url = module.exports = mongoose.model('urls', urlSchema);

