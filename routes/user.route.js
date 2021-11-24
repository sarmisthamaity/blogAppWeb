const {userController} = require('../controller/index');
const router = require('express').Router();
const fileUpload = require('../middleware/upload');
const Auth = require('../middleware/Auth');


router.post('/signup', fileUpload.single('profilepic'), userController.signUp);
router.post('/login', userController.Login);
router.get('/oneuser', Auth, userController.specificUser);


module.exports = router;
