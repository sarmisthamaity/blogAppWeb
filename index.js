const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('./view/src/logger');
const morgan = require('morgan');

app.use(cors());  // ({credentials: true, origin: "http://127.0.0.1:8080"}));

app.use(express.json());
app.use(cookieParser());

require('dotenv').config();
require('./connection/connect');

morgan.token('body', (req) => JSON.stringify(req.body));
morgan.token('id', (req) => req.query.Id)

app.use(morgan(':url :id :method :status :body'))
const routes = require('./routes/index');
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