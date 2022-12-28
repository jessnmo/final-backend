import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		minLength: 8,
	},
	password: {
		type: String,
		required: true,
	},
	accessToken: {
		type: String,
		default: () => crypto.randomBytes(128).toString('hex'),
	},
});

module.exports = mongoose.model('User', userSchema);
