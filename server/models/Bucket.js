const mongoose = require('mongoose');

const bucketSchema = mongoose.Schema({
	title: { type: String, required: true },
	url: { type: String, required: true },
	filepath: { type: String },
	preference: { type: Number, default: 50 },
	comment: { type: String, required: true },
});

const Bucket = mongoose.model('bucket', bucketSchema);
module.exports = Bucket;
