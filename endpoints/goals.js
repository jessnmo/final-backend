import { goalsModel } from '../models/goalsModel';

const getGoals = async (res) => {
	try {
		const goalItems = await goalsModel.find({}).limit(5); //need to update this to find the goals that match the accessToken
		res.status(200).json({ success: true, response: goalItems });
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
