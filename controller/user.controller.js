const userModel = require('../models/user.model');
const commentModel = require('../models/comment.model');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT)
const token = require('../services/createtoken');
const sendMailer = require('../services/mailverification');
const code = require('../services/generatecode');
const Joi = require('joi');
const { status } = require('express/lib/response');
const companyWallet = require('../models/company');
const userWallet = require('../models/userWallet');



const signUp = async (req, res) => {

    let count;
    const coins = {
        ComWallet: 10000
    };
    let companyCoins;
    if(count == undefined){
        count = count + 1;
        companyCoins = await companyWallet.create(coins);
    };

    const validation = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().required(),
        gender: Joi.string(),
        location: Joi.string().default('').allow('')
    });


    let dataValidation = validation.validate(req.body);
    if (dataValidation.error) {
        console.log(dataValidation.error.details[0].message, 'iiii');
        return res.status(400)
            .send({
                status: 400,
                message: dataValidation.error.details[0].message
            });

    } else {
        dataValidation = dataValidation.value;
    }

    try {

        const hashPassword = await bcrypt.hash(dataValidation.password, salt);
        const data = {
            name: dataValidation.name,
            email: dataValidation.email,
            password: hashPassword,
            gender: dataValidation.gender,
            location: dataValidation.location
        };
        // const verifyCode = await code.generateRandomCode();
        // const subject = `verification code is ${verifyCode}`;
        // const receiveMail = await sendMailer.mailSender(dataValidation.email, subject, '');


        const createUser = await userModel.create(data);
        const userCoins = {
            coins: 100,
            userId: createUser._id
        };
        const wallet = await userWallet.create(userCoins);
        const remainCoins = companyCoins.ComWallet - wallet.coins;

        return res.status(201).send({
            status: 201,
            message: 'user created or verify code send to your gmail'
        });

    } catch (err) {
        console.log(err, 'ooooo');
        return res.status(500).send({
            status: 500,
            err
        });
    };
};



const Login = async (req, res) => {

    console.log(req.body, 'kkkkkkk');

    const Validation = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().required()
    });

    let loginValidation = Validation.validate(req.body);
    if (loginValidation.error) {
        return res.status(400).send({
            status: 400,
            message: loginValidation.error.details[0].message
        });
    } else {
        loginValidation = loginValidation.value;
    };

    try {
        const searchUser = await userModel.findOne({ email: loginValidation.email });
        // console.log(searchUser, '00000000');

        if (searchUser === null) {
            return res.send({
                message: 'username or email something is wrong'
            });
        }

        const checkPassword = await bcrypt.compare(loginValidation.password, searchUser.password);
        if (checkPassword) {
            const payload = {
                name: searchUser.name,
                email: searchUser.email,
                password: searchUser.password,
                gender: searchUser.gender,
                userId: searchUser._id
            };

            const Token = await token.createToken(payload);
            return res
                // .cookie('Token', Token)
                .status(200).send({
                    status: 200,
                    message: 'logged in Successful',
                    Token
                });
        };

    } catch (err) {
        return res.status(500).send({
            message: err,
            status: 500
        });
    };
};



const AllUsers = async (decoded, req, res, next) => {
    // const decoded = JSON.stringify(req.decoded);
    // console.log(decoded, 'ooooo');
    // console.log('user');
    // const { email } = req.body;
    try {
        const findUser = await userModel.find({});
        return res.status(202).send({
            status: 202,
            findUser
        });

    } catch (err) {
        // console.log(err);
        // console.log('gggg');
        return res.status(400).send({
            status: 400,
            error: err
        });

    };
};



const userProfile = async (decoded, req, res, next) => {
    try {
        const user = await commentModel.findOne({ userId: decoded.userId })
            .populate("userId")
            .populate("blogId")


        // const userProfile = {
        //     name: user.name,
        // }


    } catch (err) {
        return res.status(500).send({
            status: 500,
            err
        });
    };
}



module.exports = {
    signUp,
    Login,
    AllUsers,
    userProfile
};