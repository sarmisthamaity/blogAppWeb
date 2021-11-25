const Jwt = require('jsonwebtoken');
const days = parseInt(process.env.DAYS)
const hour = parseInt(process.env.HOUR)
const time = days * hour * 60 * 60

const createToken = (data) => {
    return Jwt.sign(data,
        process.env.SERECTKEY,
        {expiresIn: time }
        );
};

module.exports = {
    createToken
};