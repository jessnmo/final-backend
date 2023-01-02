import { goalsModel } from '../models/goalsModel';
//import { authenticateUser } from './authenticateUser';

const getGoals = async (req, res) => {
	try {
		const goalItems = await goalsModel.find({}).limit(20);
		res.status(201).json({
			success: true,
			response: goalItems,
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			response: 'Cannot get goals',
			error: err.errors,
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
			response: 'Cannot post new goal item',
		});
	}
};

module.exports = { getGoals, postGoals };
