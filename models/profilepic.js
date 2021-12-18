const { string } = require('joi');
const Mongoose = require('mongoose');

const schema = new Mongoose.Schema({
    image: {
        type: String,
        defalut: ""
    }, userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "users"
    }, bio: {
        type: String,
        defalut: ""
    }
});

const profileModel = Mongoose.model('profileimages', schema);

module.exports = profileModel;