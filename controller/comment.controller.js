const commentModel = require('../models/comment.model');
const Joi = require('joi');
const blogModel = require('../models/blog.model');
const checkwords = require('../common/checkwords');

const createComment = async (decoded, req, res, next) => {
    if (decoded.message == 'jwt must be provided') {
        return res.status(400).send({
            status: 400,
            message: 'you have to signup first'
        });
    };
    const commentvalidate = Joi.object({
        comment: Joi.string().optional(null),
        like: Joi.number().optional(null),
        dislike: Joi.number().optional()
    });
    let commentValidation = commentvalidate.validate(req.body);
    if (commentValidation.error) {
        return res.status(300).send({
            status: 300,
            message: commentValidation.error
        });
    } else {
        commentValidation = commentValidation.value;
    };
    try {
        let commentLength = await checkwords.checkWords(commentValidation.comment);
        if(commentLength > 100){
            return res.send('comment should be less than 100 words')
        };
        const comments = await commentModel.create(commentValidation);
        return res.status(202).send({
            status: 202,
            comments
        });
    } catch (err) {
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