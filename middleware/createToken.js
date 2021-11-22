const Jwt = require('jsonwebtoken');

const createToken = (data) => {
    return Jwt.sign(data,
        process.env.SERECTKEY,
        {expiresIn: 365*24*60*60}
        );
};

module.exports = {
    createToken
};