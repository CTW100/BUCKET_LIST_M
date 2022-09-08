const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.post('/register', (req, res) => {
	User.create(req.body, (err) => {
		if (err) res.json({ registerSuccess: false, err });
		res.json({ registerSuccess: true });
	});
});

router.post('/login', (req, res) => {
	// 1. 입력한 데이터로 user 찾기
	User.findOne({ email: req.body.email }, (err, user) => {
		// 1-1) 일치하는 유저 없으면 컷
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: '해당 이메일에 해당하는 유저가 없습니다',
			});
		}

		// 2. 비밀번호 비교
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					loginSuccess: false,
					message: '비밀번호가 틀렸습니다',
				});
			}

			// 3. 토큰 생성
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);

				// 정상적일 경우 토큰을 쿠키나 로컬스토리지 등에 저장
				// 쿠키에 저장
				res.cookie('x_auth', user.token).status(200).json({
					loginSuccess: true,
					userId: user._id,
					token: user.token,
				});
			});
		});
	});
});

router.get('/auth', auth, (req, res) => {
	// 여기까지 미들웨어(auth.js)를 통과해 왔다는 얘기는 Authentication이 True라는 말
	// 클라이언트에게 유저 정보 전달
	res.status(200).json({
		_id: req.user._id,
		isAuth: true,
		email: req.user.email,
	});
});

router.get('/logout', (req, res) => {});

module.exports = router;
