const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    }, password: {
        type: String
    }, gender: {
        type: String
    }, profilepic: {
        type: String
    }, location: {
        type: String
    }
});

const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;