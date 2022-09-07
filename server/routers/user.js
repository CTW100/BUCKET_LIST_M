const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', (req, res) => {
	User.create(req.body, (err, user) => {
		if (err) res.json({ registerSuccess: false, err });
		res.json({ registerSuccess: true });
	});
});

router.post('/login', (req, res) => {});

router.post('/auth', (req, res) => {});

module.exports = router;
