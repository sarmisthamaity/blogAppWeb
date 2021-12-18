const express = require('express');
require('dotenv').config();
require('./connection/connect');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('./view/src/logger');
const morgan = require('morgan');
const routes = require('./routes/index');
const path = require('path');

const app = express();


app.use(cors()); 

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));


morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('id', (req) => req.query.Id)

app.use(morgan(':url :id :method :status :body'))


app.use('/', routes);


// logger.error("error");
// logger.warn("warn")
// logger.info("info");
// logger.verbose("verbose");
// logger.debug("debug");
// logger.silly("silly");



app.listen(process.env.PORT, () => {
    logger.info(`server is running on port number ${process.env.PORT}`);
});