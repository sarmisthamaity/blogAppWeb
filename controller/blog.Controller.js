const Joi = require('joi');
const blogModel = require('../models/blog.model');
const userModel = require('../models/user.model');
const checkwords = require('../common/checkwords');

const createBlog = async (decoded, req, res, next) => {
    const contentValidation = Joi.object({
        blogContent: Joi.string().required().optional(null),
        picture: Joi.string().required().optional(null)
    });

    let validationOfContent = contentValidation.validate(req.body);
    if (validationOfContent.error) {
        return res.status(300).send({
            status: 300,
            error: validationOfContent.error
        });
    } else {
        validationOfContent = validationOfContent.value;
    };
    try {
        const userName = await userModel.findOne({ name: decoded.name });
        const lenthOfContent = await checkwords.checkWords(validationOfContent.blogContent);
        if (lenthOfContent > 200) {
            res.send('content should have less than 200 words')
        };
        const blogData = {
            blogs: validationOfContent.blogContent,
            picture: req.file.filename,
            userId: userName._id
        };
        const createblog = await blogModel.create(blogData);
        return res.status(202).send({
            status: 202,
            createblog
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            status: 500,
            error: err
        });
    };
};


const editBlog = async (decoded, req, res, next) => {
    console.log(decoded);
    const content = Joi.object({
        blogs: Joi.string().required().optional(null)
    });
    let contentValidation = content.validate(req.body);
    if (contentValidation.error) {
        return res.send(contentValidation.error);
    } else {
        contentValidation = contentValidation.value;
    };
    try {
        blogModel.findOneAndUpdate({ userId: decoded.userId}, contentValidation,
            { new: true }
        ).populate({path: 'userId'})
            .exec((err, updateData) => {
                if(err){
                    res.send(err)
                } else{
                    res.send(updateData)
                };
            });
    } catch (err) {
        return res.send(err)
    };
};

const removeBlog = async(decoded, req, res, next) => {
    try{
        blogModel.deleteOne({userId: decoded.userId})
        .populate({path: 'userId'})
        .exec((err, data) => {
            if(err){
                res.send(err)
            } else{
                res.send(data)
            };
        });
    } catch(err) {
        return res.status(500).send({
            status: 500,
            messageError: err
        });
    };
};

module.exports = {
    createBlog,
    editBlog,
    removeBlog
};