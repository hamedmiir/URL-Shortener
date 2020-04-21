module.exports = {
	splitUrl: (url) => {
		//TODO: Split input url here
	},
	hashUrl: async (user, longUrl, suggestedPath) => {
		if (suggestedPath){
			//TODO: Algo for hashing unique longUrl based on user and suggestedUrl
		} else {
			//TODO: Algo for hashing unique url longUrl
		}
	},
	increaseUrlHit: async (url) => {
		url.hits ++;
		await url.save();
	},
	validateUrl: () => {
		//TODO: Should validate url with regex
	},
	
	checkUrl: async () => {
	
	}
};