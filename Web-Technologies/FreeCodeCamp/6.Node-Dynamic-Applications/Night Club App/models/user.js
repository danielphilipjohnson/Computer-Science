/* jshint esversion: 6 */

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    savedbars: [
        {
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
        }]
});
// might remove
function getUser(id, found) {
    console.log("find user by id: " + id);
    UserSchema.findById(id, found);
}


let User = module.exports = mongoose.model('User', UserSchema);


