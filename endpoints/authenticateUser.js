const User = require('../models/user');

export const authenticateUser = async (req, res, next) => {
	const accessToken = req.header('Authorization');
	try {
		const user = await User.findOne({ accessToken });
		if (user) {
			next();
		} else {
			res.status(401).json({
				success: false,
				response: 'Please log in',
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			response: error.err,
		});
	}
};
