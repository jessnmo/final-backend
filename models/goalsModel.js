import mongoose from 'mongoose';

const goalsSchema = new mongoose.Schema({
	message: {
		type: String,
		required: true,
	},
	/* createdAt:{
        type:Date,
        default:()=> new Date()
    } */
});

const goalsModel = mongoose.model('goalsModel', goalsSchema);
module.exports = { goalsModel };
