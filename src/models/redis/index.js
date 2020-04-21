import redis from 'redis';
import {RedisError} from "../../utils/errors";

//TODO: Set auth for redis
const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.on('connect', () => {
	console.log('Connected to redis server');
});

redisClient.on('ready', () => {
	console.log('Redis is ready to use');
});

redisClient.on('error', (e) => {
	throw new RedisError(e);
});

module.exports = {
	storeNewUrl: async (url) => {
		try {
			return await redisClient.get(url);
		}
		catch (e) {
			throw RedisError(e, 'error in storing new url');
		}
	},
	createNewEntry: (originalUrl, newPath) => {
		//TODO: Create new old-new url for the user
		redisClient.set(newPath, originalUrl);
	},
	getUrl: async (keyUrl) => {
		try {
			return await redisClient.get(keyUrl);
		}
		catch (e) {
			throw RedisError(e, 'error in getting stored url');
		}
	}
};

