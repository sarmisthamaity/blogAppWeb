const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`database connected securely`);
}).catch((err) => {
    console.log(err);
});