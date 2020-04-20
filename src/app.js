require('dotenv').config();
const path = require('path');
process.env.NODE_CONFIG_DIR = path.join( __dirname , 'config');

const config = require('config');
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import colors from 'colors';


let app = express();

mongoose.connect(config.get('mongo.uri'), { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.then(() => {
	console.log('[INFO] The db connected successfully'.blue);
});
db.on('error', console.error.bind(console, 'connection error:'));

if (config.get('appLogging') === true) {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./routes')(app);

app.use(function (err, req, res, next) {
	console.log('here!');
	if (err.status) {
		res.status(err.status).json({
			message: err.message,
			details: err.details
		});
	}
	else {
		res.status(500).json({
			message: err.message
		});
	}
	
});

module.exports = app;
