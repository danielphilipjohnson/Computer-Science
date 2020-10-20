/* jshint esversion: 6 */

let mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Bar schema
let BarSchema = new Schema({
    barName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    attending: { type: Boolean },
    /*
    usersAttending:{
        users: [{type: String, required: true}],
    },
    */
});

// query helpers
// add others
BarSchema.query.byBarName = function (name) {
    return this.find({ barName: name });
};


let Bar = module.exports = mongoose.model('Bar', BarSchema);
