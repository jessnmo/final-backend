import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

/* import crypto from 'crypto';
import bcrypt from 'bcrypt'; */
//import { login } from './endpoints/login';
//import { signup } from './endpoints/signup';
//import { authenticateUser } from './endpoints/authenticateUser';
//import { getGoals, postGoals } from './endpoints/goals';

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/final-backend';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => {
	res.send('Test test');
});

/* app.post('/login', login);
app.post('/signup', signup); */

/* app.post('/goals', postGoals);
app.get('/goals', getGoals); */

let goals = [
	{
		id: Date.now(),
		title: 'goal1',
		completed: false,
	},
];

app.get('/goals', (req, res) => res.send(goals));

app.post('/goals', (req, res) => {
	const goal = { title: req.body.title, id: Date.now(), completed: false };
	goals.push(goal);
	return res.send(goal);
});

app.patch('/goals/:id', (req, res) => {
	const id = req.params.id;
	const index = goals.findIndex((goal) => goal.id == id);
	const completed = Boolean(req.body.completed);
	if (index > -1) {
		goals[index].completed = completed;
	}
	return res.send(goals[index]);
});

app.delete('/goals/:id', (req, res) => {
	const id = req.params.id;
	const index = goals.findIndex((goal) => goal.id == id);
	if (index > -1) {
		goals.splice(index, 1);
	}

	res.send(goals);
});

// Start the server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
