const userRoute = require('./user.model');
const router = require('express').Router();


router.use('/', userRoute);

module.exports = router;