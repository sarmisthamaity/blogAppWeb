const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT)

const forgetPass = async(req, res ) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };
    try{
        const hashpassword = await bcrypt.hash(userData.password, salt);
        const updatePass = {
            password: hashpassword
        };
        const setPassword = await userModel.findOneAndUpdate({email: userData.email}, updatePass, {new: true});
        return res.status(202).send({
            status: 202,
            message: 'succesfull'
        });
    } catch(err){
        console.log(err);
        return res.status(500).send({
            message: 'error'
        })
    }
};


module.exports = {
    forgetPass
};