import mongoose from 'mongoose';

const goalsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	/* createdAt:{
        type:Date,
        default:()=> new Date()
    } */
	/* completed: {
		type: Boolean,
		//required: true,
	}, */
});

const goalsModel = mongoose.model('goalsModel', goalsSchema);
module.exports = { goalsModel };
