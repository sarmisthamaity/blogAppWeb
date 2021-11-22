const router = require('express').Router();

const {blogController} = require('../controller/index');
const Auth = require('../middleware/Auth');
const fileUpload = require('../middleware/upload');

router.post('/blogs', fileUpload.single('picture'), Auth, blogController.createBlog);
router.put('/editContent', Auth, blogController.editBlog);
router.delete('/removeBlog', Auth, blogController.removeBlog);

module.exports = router;