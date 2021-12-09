const {userController, forgetPass, profilepic} = require('../controller/index');
const router = require('express').Router();
const Auth = require('../middleware/Auth');
const upload = require('../middleware/upload');


router.post('/signup', userController.signUp);
router.post('/login', userController.Login);
router.get('/oneuser', Auth, userController.specificUser);
router.put('/forgetpassword', forgetPass.forgetPass);
router.post('/profileimg', upload.single('file'), Auth, profilepic.setProfile);
router.put('/editprofile', upload.single('file'), Auth, profilepic.edituserProfile);
router.delete('/profileDelete', Auth, profilepic.removeProfile);


module.exports = router;