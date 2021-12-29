const {userController, forgetPass, profilepic} = require('../controller/index');
const router = require('express').Router();
const Auth = require('../middleware/Auth');
const upload = require('../middleware/upload');


// user signup api
router.post('/signup', userController.signUp);

//user login api
router.post('/login', userController.Login);

//all user
router.get('/alluser', Auth, userController.AllUsers);

// for forget password its left
router.put('/forgetpassword', forgetPass.forgetPass);

//user profile image
router.post('/profileimg', upload.single('file'), Auth, profilepic.setProfile);

// Edit user profile image
router.put('/editprofile', upload.single('file'), Auth, profilepic.editUserProfile);

// delete user profile image
router.delete('/profileDelete', Auth, profilepic.removeProfile);



module.exports = router;