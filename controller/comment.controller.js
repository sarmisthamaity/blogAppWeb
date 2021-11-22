const commentModel = require('../models/comment.model');
const Joi = require('joi');
const blogModel = require('../models/blog.model');

const createComment = async(req, res) => {
    const commentvalidate = Joi.object({
        comment: Joi.string().optional(null),
        like: Joi.number().optional(null),
        dislike: Joi.number().optional()
    });
    let commentValidation = commentvalidate.validate(req.body);
    if(commentValidation.error){
        return res.status(300).send({
            status: 300,
            message: commentValidation.error
        });
    } else {
        commentValidation = commentValidation.value;
    };
    try{
        const comments = commentModel.create(commentValidation);
        return res.status(202).send({
            status: 202,
            comments
        })
    } catch(err){
        console.log(err);
        return res.status(500).send({
            status: 500,
            errormessage: err
        });
    };
};


const anyUser = async(req, res) => {
    try{
        const allPosts = await blogModel.find({});
        return res.status(202).send({
            status: 202,
            allPosts
        });
    } catch(err){
        console.log(err);
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