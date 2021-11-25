const userModel = require('../models/user.model');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT)
const token = require('../services/createtoken');
const sendMailer = require('../services/mailverification');
const code = require('../services/generatecode');
const validation = require('../services/datavalidation');


const signUp = async (req, res) => {
    const { name, email, password, gender, location } = req.body;
    const userData = {
        name: name,
        email: email,
        password: password,
        profilepic: req.file.filename,
        gender: gender,
        location: location
    };


    let dataValidation = validation.validate(userData);
    if (dataValidation.error) {
        return res.status(300).send({
            error: dataValidation.error.details[0].message,
            status: 300
        });
    } else {
        dataValidation = dataValidation.value;
    };
    try {
        const hashPassword = await bcrypt.hash(dataValidation.password, salt);
        const data = {
            name: dataValidation.name,
            email: dataValidation.email,
            password: hashPassword,
            gender: dataValidation.gender,
            profilepic: dataValidation.profilepic,
            location: dataValidation.location
        };
        const verifyCode = await code.generateRandomCode();

        const createUser = await userModel.create(data);

        const subject = `verification code is ${verifyCode}`;
        const receiveMail = await sendMailer.mailSender(dataValidation.email, subject, '');
        const datas = {
            name: createUser.name,
            email: createUser.email,
            gender: createUser.gender,
            profilepic: createUser.profilepic,
            location: createUser.location
        };
        return res.status(201).send({
            status: 201,
            message: 'user created or verify code send to your gmail',
            mailResponse: receiveMail.response,
            datas
        });
    } catch (err) {
        console.log(err);
        return res.status(406).send({
            error: 'duplicate key error in collection',
            status: 406
        });
    };
};


const Login = async (req, res) => {
    const { name, password, email, gender } = req.body;
    const loginData = {
        name: name,
        password: password,
        email: email,
        gender: gender
    };
    let loginValidation = validation.validate(loginData);
    if (loginValidation.error) {
        return res.status(406).send({
            status: 406,
            error: loginValidation.error.details[0].message
        });
    } else {
        loginValidation = loginValidation.value;
    };
    const payload = {
        name: loginValidation.name,
        email: loginValidation.email,
        password: loginValidation.password,
        gender: loginValidation.gender
    };
    try {
        const searchUser = await userModel.findOne({ gmail: loginValidation.gmail });
        payload.userId = searchUser._id;
        const Token = await token.createToken(payload);
        const checkPassword = await bcrypt.compare(loginValidation.password, searchUser.password);
        const datas = {
            name: searchUser.name,
            gmail: searchUser.email,
            gender: searchUser.gender,
            profilepic: searchUser.profilepic,
            location: searchUser.location
        };
        if (checkPassword) {
            return res.status(202).send({
                status: 202,
                message: 'logged in succesfully',
                Token,
                datas
            });
        };
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            error: err,
            status: 400
        });
    };
};


const specificUser = async (decoded, req, res, next) => {
    const { gmail } = req.body;
    try {
        const findUser = await userModel.findOne({ gmail: gmail });
        return res.status(202).send({
            status: 202,
            message: findUser
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            status: 400,
            error: err
        });
    };
};



module.exports = {
    signUp,
    Login,
    specificUser
};