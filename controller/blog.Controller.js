const Joi = require('joi');
const blogModel = require('../models/blog.model');
const userModel = require('../models/user.model');

const createBlog = async(decoded, req, res, next) => {
    const contentValidation = Joi.object({
        blogContent: Joi.string().required().optional(null),
        picture: Joi.string().required().optional(null)
    });

    let validationOfContent = contentValidation.validate(req.body);
    if(validationOfContent.error){
        return res.status(300).send({
            status: 300,
            error: validationOfContent.error
        });
    } else{
        validationOfContent = validationOfContent.value;
    };

    try{
        const Id = await userModel.findOne({name: decoded.name});
        const blogData = {
            blogs: validationOfContent.blogContent,
            picture: req.file.filename,
            userId: Id._id
        };
        const createblog = await blogModel.create(blogData);
        return res.status(202).send({
            status: 202,
            createblog
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
    createBlog
};