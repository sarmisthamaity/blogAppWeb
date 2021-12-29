const mongoose = require('mongoose');

const schema = mongoose.Schema({
    coins: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
});



const userWallet = new mongoose.model('userwallets', schema);

module.exports = userWallet;