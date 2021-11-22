const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    }, like: {
        type: Number
    }, dislike: {
        type: Number
    }, blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'
    }
});

const commentModel = new mongoose.model('comment', commentSchema);

module.exports = commentModel;