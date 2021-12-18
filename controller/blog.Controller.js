const Joi = require('joi');
const blogModel = require('../models/blog.model');
const userModel = require('../models/user.model');
const checkWords = require('../services/checkwords');

const createBlog = async (decoded, req, res, next) => {
    // console.log(decoded, 'iiiii');
    // console.log(req.file, 'gggggg');

    const validation = Joi.object({
        blog: Joi.string(),
        file: Joi.string()
    });
    let validationOfContent = validation.validate(req.body);
    if (validationOfContent.error) {
        return res.status(400).send({
            status: 400,
            error: validationOfContent.error
        });
    } else {
        validationOfContent = validationOfContent.value;
    };
    try {
        const userName = await userModel.findOne({ email: decoded.email });
        const lenthOfContent = await checkWords.checkWords(validationOfContent.blogContent);
        if (lenthOfContent > 200) {
            res.send('content should have less than 200 words')
        };
        const blogData = {
            blog: validationOfContent.blog,
            image: req.file.filename,
            userId: userName._id
        };
        const createBlog = await blogModel.create(blogData);
        return res.status(201).send({
            status: 201,
            message: 'blog created',
            createBlog
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            status: 400,
            error: err
        });
    };
};



const editBlog = async (decoded, req, res, next) => {
    const validation = Joi.object({
        blog: Joi.string(),
        picture: Joi.string()
    });
    let contentValidation = validation.validate(req.body);
    if (contentValidation.error) {
        return res.status(400)
            .send(contentValidation.error.details[0].message);
    } else {
        contentValidation = contentValidation.value;
    };
    try {
        // const checkUser = await blogModel.findOne({ userId: decoded.userId });
        // if (checkUser) {
        const updateData = await blogModel.findByIdAndUpdate({ _id: req.query.Id }, contentValidation, { new: true });
        return res.status(202).send({
            status: 202,
            updateData
        });
        // } else {
        //     res.send('you can"t edit the content ')
        // }

    } catch (err) {
        console.log(err);
        return res.status(400).send(err)
    };
};


const removeBlog = async (decoded, req, res, next) => {
    try {
        const checkUser = await blogModel.findOne({ userId: decoded.userId });
        if (checkUser) {
            const deleteBlog = await blogModel.deleteOne({ _id: req.query.Id });
            return res.status(202).send({
                status: 202,
                message: 'blog successful deleted'
            });
        }
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