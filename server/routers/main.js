const express = require('express');
const router = express.Router();
const Bucket = require('../models/Bucket');

router.get('/getBuckets', (req, res) => {
	Bucket.find().exec((err, buckets) => {
		if (err) res.json({ getSuccess: false, err });
		res.json({ getSuccess: true, buckets });
	});
});

module.exports = router;
