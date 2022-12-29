import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

//import { login } from './endpoints/login';
//import { signup } from './endpoints/signup';
//import { authenticateUser } from './endpoints/authenticateUser';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/final-backend';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//Schema / Model
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

// Start defining your routes here
app.get('/', (req, res) => {
	res.send("Let's get snatched!");
});

//routes
// login and signup
app.post('./signup', async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const salt = bcrypt.genSaltSync();
		const usedUsername = await User.findOne({ username });
		if (usedUsername) {
			res.status(400).json({
				success: false,
				response: 'Username already in use',
			});
		}
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
		} else {
			res.status(400).json({
				success: false,
				response: error.err,
			});
		}
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
