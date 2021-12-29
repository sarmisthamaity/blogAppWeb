const mongoose = require('mongoose');

const schema = mongoose.Schema({
    ComWallet: {
        type: Number,
        default: 1000
    }
});


const companyWallet = new mongoose.model('companywallets', schema);

module.exports = companyWallet;