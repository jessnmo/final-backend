import bcrypt from 'bcrypt';
import crypto from 'crypto';

const User = require('../Schemas/user');

export const signup = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync();
		if (password.length < 8) {
			res.status(400).json({
				success: false,
				response: 'Password has to be 8 characters or longer',
			});
		} else {
			const newUser = await new User({
				username: username,
				email: email.toLowerCase(),
				password: bcrypt.hashSync(password, salt),
			}).save();
			res.status(201).json({
				success: true,
				response: {
					username: newUser.username,
					email: newUser.email,
					accessToken: newUser.accessToken,
					userId: newUser._id,
				},
			});
		}
	} catch (err) {
		const existUser = await User.findOne({ email });
		if (email === '') {
			res.status(400).json({
				success: false,
				response: 'Please enter email to proceed',
				error: error,
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
				response: error.err,
			});
		}
	}
};
