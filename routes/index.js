const router = require('express').Router();

const userRoute = require('./user.route');
const blogRoute = require('./blog.route');
const commentRoute = require('./comment.route');


// user route
router.use('/', userRoute);

// blog route
router.use('/', blogRoute);

// comments route
router.use('/', commentRoute);


module.exports = router;