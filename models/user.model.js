const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    }, email: {
        type: String,
        index: true,
        unique: true,
        dropDups: true,
        sparse: true
    }, password: {
        type: String
    }, gender: {
        type: String,
        enum : ['male','female'], 
    }, location: {
        type: String,
        default: ''
    }
});


const userModel = new mongoose.model('users', userSchema);

module.exports = userModel;