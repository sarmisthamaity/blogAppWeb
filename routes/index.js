const router = require('express').Router();

const userRoute = require('./user.route');
const blogRoute = require('./blog.route');
const commentRoute = require('./comment.route');

router.use('/', userRoute);
router.use('/', blogRoute);
router.use('/', commentRoute);


module.exports = router;