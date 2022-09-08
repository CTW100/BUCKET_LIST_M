const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	sex: { type: String, required: true },
	birth: { type: Date, required: true },
	phone: { type: Number },
	token: String,
	tokenExp: Number,
});

// (회원가입) - 비밀번호 암호화
userSchema.pre('save', function (next) {
	const user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) {
				console.log(err);
				return next(err);
			}

			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

// (로그인) - 입력한 비밀번호 vs 암호화된 DB 비밀번호 비교
userSchema.methods.comparePassword = function (plainPassword, cb) {
	const user = this;

	bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// (로그인) - 토큰 발행
userSchema.methods.generateToken = function (cb) {
	const user = this;

	// jsonwebtoken을 이용해서 토큰 생성
	const token = jwt.sign(user._id.toHexString(), 'secretToken');
	// user._id + 'secretToken' = token 을 통해 토큰 생성
	// 토큰 해석을 위해 'secretToken' 입력 -> user._id 가 나옴
	// 토큰을 가지고 누구인지 알 수 있는 것
	user.token = token;

	user.save(function (err, user) {
		if (err) return cb(err);
		cb(null, user);
	});
};

// (인증) - 토큰으로 DB USER 찾기
userSchema.statics.findByToken = function (token, cb) {
	const user = this;

	jwt.verify(token, 'secretToken', function (err, decoded) {
		// 유저 아이디를 이용해서 유저를 찾은 다음에
		// 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
		user.findOne({ _id: decoded, token: token }, function (err, user) {
			if (err) return cb(err);
			cb(null, user);
		});
	});
};

const User = mongoose.model('user', userSchema);
module.exports = User;
