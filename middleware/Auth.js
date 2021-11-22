const Jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = '';
    try {
        if (!req.headers.authorization) {
            return res.status(304).send({
                status: 304,
                message: ' token not found'
            });
        } if (req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        } else {
            token = req.headers.authorization
        }
        const decoded = Jwt.verify(token, process.env.SERECTKEY);
        next(decoded)
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({
            status: 500,
            message: 'unauthorised'
        });
    };
};