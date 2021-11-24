const userModel = require('../models/user.model');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT)
const token = require('../middleware/createToken');
const sendMailer = require('../common/mailverification');
const code = require('../common/generatecode');
   
const signUp = async(req, res) => {
    const dataValidation = Joi.object({
        name: Joi.string().required(),
        gmail: Joi.string().email().required(),
        password: Joi.string().alphanum().required(),
        gender: Joi.string().required(),
        profilepic: Joi.string().required().optional(null),
        location: Joi.string().optional(null).default(null)
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
        const searchUser = await userModel.findOne({gmail: validation.gmail});
        if(searchUser){
            return res.status(422).send({
                status: 422,
                message: 'gmail already exists'
            });
        } else {

        };
        const hashPassword = await bcrypt.hash(validation.password, salt);
        const data = {
            name: validation.name,
            gmail: validation.gmail,
            password: hashPassword,
            gender: validation.gender,
            profilepic: req.file.filename,
            location: validation.location
        };
        const verifyCode = await code.generateRandomCode();

        const createUser = await userModel.create(data);
        const subject = `verification code is ${verifyCode}`;
        const receiveMail = await sendMailer.mailSender(validation.gmail, subject, '');

        const datas = {
            name: createUser.name,
            gmail: createUser.gmail,
            gender: createUser.gender,
            profilepic: createUser.profilepic,
            location: createUser.location
        };
        return res.status(202).send({
            status: 202,
            message: 'user created or verify code send to your gmail',
            datas
        });
    }catch(err){
        console.log(err);
        return res.status(500).send({
            error: err,
            status: 500
        });
    };
};


const Login = async(req, res) => {
    const dataValidation = Joi.object({
        name: Joi.string().required(),
        gmail: Joi.string().email().required(),
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
        gmail: loginValidation.gmail,
        password: loginValidation.password,
    };
    try{
        const searchUser = await userModel.findOne({gmail: loginValidation.gmail});
        console.log(searchUser, 'ooooo');
        payload.userId = searchUser._id;
        const Token = await token.createToken(payload);
        const checkPassword = await bcrypt.compare(loginValidation.password, searchUser.password);
        const datas = {
            name: searchUser.name,
            gmail: searchUser.gmail,
            gender: searchUser.gender,
            profilepic: searchUser.profilepic,
            location: searchUser.location
        };
        if(checkPassword){
            return res.status(202).send({
                status: 202,
                message: 'logged in succesfully',
                Token,
                datas
            });
        };
    }catch(err){
        console.log(err);
        return res.status(500).send({
            error: err,
            status: 500
        });
    };
};


const specificUser = async(decoded, req, res, next) => {
    const {gmail} = req.body;
    try{
        const findUser = await userModel.findOne({gmail: gmail});
        return res.status(202).send({
            status: 202,
            message: findUser
        });
    } catch(err) {
        console.log(err);
        return res.status(500).send({
            status: 500,
            error: err
        });
    };
};



module.exports = {
    signUp,
    Login,
    specificUser
};