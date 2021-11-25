const commentModel = require('../models/comment.model');
const Joi = require('joi');
const blogModel = require('../models/blog.model');
const checkwords = require('../services/checkwords');
const comvalidation = require('../services/datavalidation')

const createComment = async (decoded, req, res, next) => {
    const Blog = await blogModel.findOne({ userId: decoded.userId }).populate({ path: 'userId' });
    const { comment, like, dislike } = req.body;
    const data = {
        comment: comment,
        like: like,
        dislike: dislike
    };
    let commentValidation = comvalidation.validate(data);
    if (commentValidation.error) {
        return res.status(400).send({
            status: 400,
            message: commentValidation.error
        });
    } else {
        commentValidation = commentValidation.value;
    };
    try {
        let commentLength = await checkwords.checkWords(commentValidation.comment);
        if (commentLength > 100) {
            return res.send('comment should be less than 100 words')
        };
        const commentPayload = {
            comment: commentValidation.comment,
            like: commentValidation.like,
            dislike: commentValidation.dislike,
            blogId: Blog._id,
            userId: Blog.userId._id
        };
        const comments = await commentModel.create(commentPayload);
        return res.status(202).send({
            status: 202,
            comments
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            status: 500,
            errormessage: err
        });
    };
};



const anyUser = async (req, res) => {
    try {
        const allPosts = await blogModel.find({});
        return res.status(202).send({
            status: 202,
            allPosts
        });
    } catch (err) {
        return res.status(500).send({
            status: 500,
            error: err
        });
    };
};


module.exports = {
    createComment,
    anyUser
};