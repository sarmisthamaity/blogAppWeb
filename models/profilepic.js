const { string } = require('joi');
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    image: {
        type: String,
        defalut: ""
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }, bio: {
        type: String,
        defalut: ""
    }
});

const profileModel = mongoose.model('profileimages', schema);

module.exports = profileModel;