const path = require('path');
process.env.NODE_CONFIG_DIR = path.join( __dirname , 'config');

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');



let app = express();

if (config.get('appLogging') === true) {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


require('./routes')(app);

module.exports = app;
