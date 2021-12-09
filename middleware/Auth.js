const Jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // console.log(req.headers.authorization, 'gggggg');

    let decoded;
    let token = '';
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({
                status: 401,
                message: 'token not found or first do signup/login'
            });
        } else if (req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            token = req.headers.authorization;
        }
        decoded = Jwt.verify(token, process.env.SERECTKEY);
        req.decoded = decoded;
        next(decoded);
    }
    catch (err) {
        console.log(err);
        return res.status(401).send({
            status: 401,
            message: 'Unauthorized'
        });
    };
};