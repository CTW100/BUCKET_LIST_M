const mongoose = require('mongoose');

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

const User = mongoose.model('user', userSchema);
module.exports = User;
