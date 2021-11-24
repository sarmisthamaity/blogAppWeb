const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    }, gmail: {
        type: String
    }, password: {
        type: String
    }, gender: {
        type: String
    }, profilepic: {
        type: String,
        default: ''
    }, location: {
        type: String,
        default: ''
    }
});

const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;