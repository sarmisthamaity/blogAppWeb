const express = require('express');
const app = express();

app.use(express.json());
require('dotenv').config();
require('./connection/connect');
const routes = require('./routes/index');

app.use('/', routes);


app.listen(process.env.PORT, () => {
    console.log(`server is running on port number ${process.env.PORT}`);
});