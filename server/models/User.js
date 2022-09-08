const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// (로그인) - 토큰 발행

// (로그인) - 토큰으로 DB USER 찾기

const User = mongoose.model('user', userSchema);
module.exports = User;
