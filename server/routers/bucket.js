const express = require('express');
const router = express.Router();
const multer = require('multer');

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

router.post('/uploadbucket', (req, res) => {
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

module.exports = router;
