module.exports = {
	redirect: async (req, res, next) => {
		try {
			let path = req.params;
			let originalUrl;
			//TODO: Find the original url form stored data in redis
			res.redirect(301, originalUrl);
		}
		catch (e) {
			next(e);
		}
	}
};