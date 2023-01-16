import { goalsModel } from '../models/goalsModel';
import { User } from '../models/user';

const getGoals = async (req, res) => {
	try {
		const accessToken = req.headers.authorization;
		const user = await User.findOne({ accessToken });
		if (user) {
			const goalItems = await goalsModel.find({ accessToken }).limit(5);
			res.status(200).json({ success: true, response: goalItems });
		} else {
			res.status(401).json({
				success: false,
				response: 'Please log in',
			});
		}
	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Cannot get goals',
			response: err.errors,
		});
	}
};

const postGoals = async (req, res) => {
	const { message } = req.body;
	try {
		const newGoal = await new goalsModel({
			message: message,
			accessToken: req.headers.authorization,
		}).save();
		res.status(201).json({
			success: true,
			response: newGoal,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			message: 'Cannot post this goal',
			response: err,
		});
	}
};

module.exports = { getGoals, postGoals };
