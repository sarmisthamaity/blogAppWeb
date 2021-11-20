const userModel = require('../models/user.model');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT)
const token = require('../middleware/createToken');


const signUp = async(req, res) => {
    const dataValidation = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().alphanum().required(),
        gender: Joi.string().required(),
        profilepic: Joi.string().required().optional(null),
        location: Joi.string().required().optional(null)
    });
    let validation = dataValidation.validate(req.body);
    if(validation.error){
        return res.status(300).send({
            error: validation.error,
            status: 300
        });
    } else{
        validation = validation.value;
    };
    try{
        const searchUser = await userModel.findOne({name: validation.name});
        if(searchUser){
            return res.status(422).send({
                status: 422,
                message: 'username not available create different username'
            });
        } else {

        };
        const hashPassword = await bcrypt.hash(validation.password, salt);
        const data = {
            name: validation.name,
            password: hashPassword,
            gender: validation.gender,
            profilepic: req.file.filename,
            location: validation.location
        };
        const craeteUser = await userModel.create(data);
        return res.status(202).send({
            status: 202,
            message: 'user created',
            craeteUser
        });
    }catch(err){
        return res.status(500).send({
            error: err,
            status: 500
        });
    };
};


const Login = async(req, res) => {
    const dataValidation = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().alphanum().required(),
    });
    let loginValidation = dataValidation.validate(req.body);
    if(loginValidation.error){
        return res.status(300).send({
            status: 300,
            error: loginValidation.error
        });
    } else{
        loginValidation = loginValidation.value;
    };
    const payload = {
        name: loginValidation.name,
        password: loginValidation.password,
    };
    try{
        const Token = await token.createToken(payload);
        const searchUser = await userModel.findOne({name: loginValidation.name});
        const checkPassword = await bcrypt.compare(loginValidation.password, searchUser.password);
        if(checkPassword){
            return res.status(202).send({
                status: 202,
                message: 'logged in succesfully',
                Token,
                searchUser
            });
        }
    }catch(err){
        console.log(err);
        return res.status(500).send({
            error: err,
            status: 500
        });
    };
};


module.exports = {
    signUp,
    Login
};