const commentModel = require('../models/comment.model');
const Joi = require('joi');
const blogModel = require('../models/blog.model');
const checkwords = require('../services/checkwords');

const createComment = async (decoded, req, res, next) => {
    const Blog = await blogModel.findOne({ userId: decoded.userId });
    const comvalidation = Joi.object({
        comment: Joi.string(),
        like: Joi.number(),
        dislike: Joi.number()
    });
    let commentValidation = comvalidation.validate(req.body);
    if (commentValidation.error) {
        return res.status(400).send({
            status: 400,
            message: commentValidation.error.details[0].message
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
        const allPosts = await commentModel.find({})
        .populate("userId")
        .populate("blogId")
        console.log(allPosts, );
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