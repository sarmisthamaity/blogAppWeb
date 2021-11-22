const router = require('express').Router();
const Auth = require('../middleware/Auth');

const {commentController} = require('../controller/index'); 

router.post('/comments', Auth, commentController.createComment);
router.get('/allposts', commentController.anyUser);

module.exports = router;