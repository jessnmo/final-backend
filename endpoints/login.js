import bcrypt from 'bcrypt';
//import mongoose from 'mongoose';
//const User = require('../models/user');
import { User } from '../models/user';

const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				success: true,
				response: {
					username: user.username,
					id: user._id,
					accessToken: user.accessToken,
				},
			});
		} else {
			res.status(400).json({
				success: false,
				response: "Credentials didn't match",
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			response: err,
		});
	}
};

module.exports = { login };
