const router = require('express').Router();

const {blogController} = require('../controller/index');
const Auth = require('../middleware/Auth');
const upload = require('../middleware/upload');

// blog route
router.post('/blogs', upload.single('file'), Auth, blogController.createBlog);


// blog update route
router.put('/editContent', Auth, blogController.editBlog);

// 
router.delete('/removeBlog', Auth, blogController.removeBlog);


module.exports = router;