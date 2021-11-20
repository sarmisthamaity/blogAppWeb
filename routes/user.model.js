const {userController} = require('../controller/index');
const router = require('express').Router();
const fileUpload = require('../middleware/upload');


router.post('/signup', fileUpload.single('profilepic'), userController.signUp);
router.post('/login', userController.Login);


module.exports = router;
