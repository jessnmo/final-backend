import bcrypt from 'bcrypt';
import crypto from 'crypto';

//const User = require('../models/user');
import { User } from '../models/user';

const signup = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync();
		if (password.length < 8) {
			res.status(400).json({
				success: false,
				response: 'Password has to be 8 characters or longer',
			});
		} else {
			const newUser = await User.create({
				username: username,
				email: email.toLowerCase(),
				password: bcrypt.hashSync(password, salt),
			});
			res.status(201).json({
				success: true,
				response: {
					userId: newUser._id,
					username: newUser.username,
					email: newUser.email,
					accessToken: newUser.accessToken,
				},
			});
		}
	} catch (err) {
		const existUser = await User.findOne({ email });
		if (email === '') {
			res.status(400).json({
				success: false,
				response: 'Please enter email to proceed',
				error: err.errors,
			});
		} else if (existUser) {
			res.status(400).json({
				success: false,
				response: 'User already exist',
			});
			const usedUsername = await User.findOne({ username });
			if (usedUsername) {
				res.status(400).json({
					success: false,
					response: 'Username already in use',
				});
			}
		} else {
			res.status(400).json({
				success: false,
				response: err.errors,
			});
		}
	}
};

module.exports = { signup };
