import bcrypt from 'bcrypt';

const User = require('../Schemas/user');

export const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({
				success: true,
				response: {
					username: user.username,
					userId: usr._id,
					accessToken: user.accessToken,
				},
			});
		} else {
			res.status(400).json({
				success: false,
				response: 'Incorrect username + password combination, try again',
			});
		}
	} catch (err) {
		res.status().json({
			success: false,
			response: 'Something gone wrong with the website',
			error: error.err,
		});
	}
};
