const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogs: {
        type: String
    }, picture: {
        type: String
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const blogModel = new mongoose.model('blogs', blogSchema);

module.exports = blogModel;