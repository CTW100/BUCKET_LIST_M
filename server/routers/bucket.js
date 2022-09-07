const express = require('express');
const router = express.Router();
const multer = require('multer');
const Bucket = require('../models/Bucket');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== '.png' || ext !== '.jpg' || ext !== '.jpeg') {
			return cb(
				res.status(400).end('only png, jpg or jpeg are allowed!')
			);
		}
		cb(null, true);
	},
});

const upload = multer({ storage: storage }).single('file');

router.post('/uploadBucket', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			return res.json({ uploadSuccess: false });
		}
		console.log('res.req.file: ', res.req.file);
		return res.json({
			uploadSuccess: true,
			filepath: res.req.file.path,
			filename: res.req.file.filename,
		});
	});
});

router.post('/createBucket', (req, res) => {
	Bucket.create(req.body, (err, bucket) => {
		if (err) return res.json({ createSuccess: false, err });
		res.json({ createSuccess: true, bucket: bucket });
	});
});

router.post('/getBucket', (req, res) => {
	Bucket.find({ _id: req.body.bucketID }, (err, bucket) => {
		if (err) {
			console.log(err);
			res.json({ findSuccess: false });
		}
		res.json({ findSuccess: true, bucket });
	});
});

module.exports = router;
