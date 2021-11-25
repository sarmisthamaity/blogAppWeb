const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        default: ''
    }, like: {
        type: Number,
        default: ''
    }, dislike: {
        type: Number,
        default: ''
    }, blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});



const commentModel = new mongoose.model('comment', commentSchema);

module.exports = commentModel;