const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.SALT)
const commentModel = require('../models/comment.model');
const blogModel = require('../models/blog.model');
const profileModel = require('../models/profilepic');

const forgetPass = async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };
    try {
        const hashPassword = await bcrypt.hash(userData.password, salt);
        const updatePass = {
            password: hashPassword
        };
        const setPassword = await userModel.findOneAndUpdate({ email: userData.email }, updatePass, { new: true });
        return res.status(202).send({
            status: 202,
            message: 'successful'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: 'error'
        })
    }
};



const AllBlogPosts = async (req, res) => {
    // const allData = await commentModel.find({ _id: req.query.ID })
    //     .populate('userId')
    //     .populate('blogId')

    try {
        const allData = await blogModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'blogId',
                as: 'comment'
            }
        }
        ])
        // console.log(allData, 'iiiii');

        return res.status(202)
            .send({
                status: 202,
                allData
            })
    } catch (err) {
        // console.log(err);
        return res.send({
            status: 400,
            message: err
        })
    }
}



const getUserProfile = async (decoded, req, res, next) => {
    try {
        const userProfile = await profileModel.findOne({ _id: "61cabfe001a0793e76ecb08a" })
            .populate('userId');

        const Datas = {
            image: userProfile.image,
            name: userProfile.userId.name,
            bio: userProfile.bio
        }
        return res.status(202).send({
            status: 202,
            Datas
        })
    } catch (err) {
        return res.status(400).send({
            status: 400,
            err
        })
    }
}


module.exports = {
    forgetPass,
    AllBlogPosts,
    getUserProfile
};