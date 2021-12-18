const router = require('express').Router();

const {blogController} = require('../controller/index');
const Auth = require('../middleware/Auth');
const upload = require('../middleware/upload');

// To create blog post
router.post('/blogs', upload.single('file'), Auth, blogController.createBlog);


// To edit blog
router.put('/editContent', Auth, blogController.editBlog);

// to delete blog and image
router.delete('/removeBlog', Auth, blogController.removeBlog);


module.exports = router;