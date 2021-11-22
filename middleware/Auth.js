const Jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let decoded;
    let token = '';
    try {
        if (!req.headers.authorization) {
            decoded = {
                status: 300,
                message: 'jwt must be provided'
            }
            next(decoded);
        } else if (req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            token = req.headers.authorization;
        }
        decoded = Jwt.verify(token, process.env.SERECTKEY);
        next(decoded);
    }
    catch (err) {
        decoded = err;
        next(decoded)
    };
};