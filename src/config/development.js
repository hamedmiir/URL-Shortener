const defer = require('config/defer').deferConfig;

module.exports = {
	appLogging: true,
	mongo: {
		options: {
			host: "localhost",
			port: "27017",
			db: "urlShortener",
			username: "",
			password: ""
		},
		uri: defer(function () {
			return `mongodb://${this.mongo.options.host}:${this.mongo.options.port}/${this.mongo.options.db}`
		})
	},
};