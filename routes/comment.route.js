const router = require('express').Router();
const Auth = require('../middleware/Auth');

const { forgetPass } = require('../controller/index');
const {commentController} = require('../controller/index'); 


// to create comments 
router.post('/comments', Auth, commentController.createComment);

// to get all posts, user Details and blog posts
router.get('/allposts', commentController.anyUser);

// to get all comments and like
router.get('/blogComments', forgetPass.allComment);

// get userProfile
router.get('/userprofile', forgetPass.getUserProfile);


module.exports = router;