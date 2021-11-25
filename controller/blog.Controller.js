const Joi = require('joi');
const blogModel = require('../models/blog.model');
const userModel = require('../models/user.model');
const checkwords = require('../services/checkwords');
const comvalidation = require('../services/datavalidation');

const createBlog = async (decoded, req, res, next) => {
    const { blog, picture } = req.body;
    const blogD = {
        blog: blog,
        picture: picture
    };
    let validationOfContent = comvalidation.validate(blogD);
    if (validationOfContent.error) {
        return res.status(400).send({
            status: 400,
            error: validationOfContent.error
        });
    } else {
        validationOfContent = validationOfContent.value;
    };
    try {
        const userName = await userModel.findOne({ gmail: decoded.gmail });
        const lenthOfContent = await checkwords.checkWords(validationOfContent.blogContent);
        if (lenthOfContent > 200) {
            res.send('content should have less than 200 words')
        };
        const blogData = {
            blog: validationOfContent.blog,
            picture: req.file.filename,
            userId: userName._id
        };
        const createblog = await blogModel.create(blogData);
        return res.status(201).send({
            status: 201,
            createblog
        });
    } catch (err) {
        console.log(err);
        return res.status(404).send({
            status: 404,
            error: err
        });
    };
};


const editBlog = async (decoded, req, res, next) => {
    console.log("DECODED: " + JSON.stringify(req.decoded));
    const blogC = req.body.blog;
    let contentValidation = comvalidation.validate(blogC);
    if (contentValidation.error) {
        return res.status(400)
            .send(contentValidation.error);
    } else {
        contentValidation = contentValidation.value;
    };
    try {
        blogModel.findOneAndUpdate({ userId: decoded.userId }, contentValidation,
            { new: true }
        ).populate({ path: 'userId' })
            .exec((err, updateData) => {
                if (err) {
                    res.status(304).send({
                        status: 304,
                        err
                    });
                } else {
                    res.status(202).send({
                        status: 202,
                        updateData
                    });
                };
            });
    } catch (err) {
        return res.send(err)
    };
};

const removeBlog = async (decoded, req, res, next) => {
    try {
        blogModel.deleteOne({ userId: decoded.userId })
            .populate({ path: 'userId' })
            .exec((err, data) => {
                if (err) {
                    res.status(417).send({
                        status: 417,
                        err
                    });
                } else {
                    res.status(202).send({
                        status: 202,
                        message: 'data deleted',
                        data
                    });
                };
            });
    } catch (err) {
        return res.status(417).send({
            status: 417,
            messageError: err
        });
    };
};

module.exports = {
    createBlog,
    editBlog,
    removeBlog
};