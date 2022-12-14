// 인증 처리하는 곳
const User = require('../models/User');

module.exports = auth = (req, res, next) => {
	// 클라이언트 쿠키에서 토큰을 가져옴
	let token = res.cookies.x_auth;

	console.log('token: ', token);

	// 토큰을 복호화한 후 유저를 찾는다
	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user) return res.json({ isAuth: false, error: true });

		req.token = token;
		req.user = user;
		next();
	});
};
