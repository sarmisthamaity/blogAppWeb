const router = require('express').Router();

const {commentController} = require('../controller/index'); 

router.post('/comments', commentController.createComment);
router.get('/allposts', commentController.anyUser);

module.exports = router;