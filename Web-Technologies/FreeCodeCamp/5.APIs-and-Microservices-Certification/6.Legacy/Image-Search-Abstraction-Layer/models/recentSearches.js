let mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
// Url schema
let recentSearchesSchema =  mongoose.Schema({
    term:{
        type: String,
        required: true,
    },
   
    search_date:{
        type: Date,
        required: true
    }
});
////urlSchema.plugin(uniqueValidator);
let recentSearch = module.exports = mongoose.model('recentSearch', recentSearchesSchema);

