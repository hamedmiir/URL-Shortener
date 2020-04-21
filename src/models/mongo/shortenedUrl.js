const mongoose = require('mongoose');

let Schema = mongoose.Schema;
const UrlObjectSchema = new Schema({
	_creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		index: true
	},
	originalUrl: {
		type: String,
		required: true
	},
	shortenedUrl: {
		type: String,
		required: true
	},
	hits: {
		type: Number,
		default: 0
	}
}, {
	timestamp: true
});

export let UrlObject = mongoose.model('ShortUrl', UrlObjectSchema);