const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`database connected securely`);
}).catch((err) => {
    console.log(err);
    console.log()
});


//user 1

// "name": "anuj",
// "password": "anuj123",
// "email": "anup@gmail.com"


// user 2

// "name": "anuj",
// "password": "anuj123",
// "email": "anuj@gmail.com",

//user 3

// "name": "ankit",
// "password": "ankit123",
// "email": "ankit@gmail.com",