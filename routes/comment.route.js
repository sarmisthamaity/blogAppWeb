const router = require('express').Router();
const Auth = require('../middleware/Auth');

const { forgetPass } = require('../controller/index');
const {commentController} = require('../controller/index'); 


// to create comments 
router.post('/comments', Auth, commentController.createComment);

// to get all posts, user Details and blog posts
router.get('/allposts', commentController.anyUser);

// to get all comments and like
router.get('/allUsersBlogs', forgetPass.AllBlogPosts);

// get userProfile
router.get('/userprofile', Auth, forgetPass.getUserProfile);


module.exports = router;