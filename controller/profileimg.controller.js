const profileModel = require('../models/profilepic');

// creating profile picture 
const setProfile = async (decoded, req, res, next) => {
    // console.log(req.get("host"), 'uuuuu');
    const url = req.protocol + "://" + req.get("host");
    // console.log(url, 'bbbbb');
    try {
        // const { name, bio } = req.body;
        const data = {
            image: req.file.path,
            bio: req.body.bio,
            userId: decoded.userId
        };

        const createProfile = await profileModel.create(data);
        // console.log(createProfile, 'nnnnnnn');
        return res.status(202).send({
            status: 202,
            message: "Successful",
            createProfile
        });
    } catch (err) {
        console.log(err);
        return res.status(300).send({
            status: 300,
            message: 'profile picture not set'
        })
    }
};



const editUserProfile = async (decoded, req, res, next) => {
    // console.log(decoded, 'xxxxxxxx');
    console.log(req.file, 'mmmmmmm');
    try {
        const Data = {
            image: req.file.filename,
            bio: req.body.bio
        };
        // const checkUser = await profileModel.findOne({ userId: decoded.userId });
        // if (checkUser) {

        const updateData = await profileModel.
            findOneAndUpdate({ userId: decoded.userId },
                Data, { new: true });

        // await updateData.save();
        return res.status(202).send({
            status: 202,
            updateData
        });


        // } else {
        //     res.send('don"t have access to edit this profile')
        // }

    } catch (err) {
        console.log(err);
        return res.status(300).send({
            status: 300,
            error: err
        });
    };
};


const removeProfile = async (decoded, req, res, next) => {
    try {
        const checkuser = await profileModel.findOne({ userId: decoded.userId });
        if (checkuser) {
            const removeUser = await profileModel.deleteOne({ image: checkuser.image });
            return res.status(202).send({
                status: 202,
                message: 'delete succesfully'
            });
        } else {
            res.send("don't have asscess to delete the profile image")
        }
    } catch (err) {
        console.log(err);
        return res.status(300).send({
            error: 300,
            error: err
        });
    };
};


module.exports = {
    setProfile,
    editUserProfile,
    removeProfile
};