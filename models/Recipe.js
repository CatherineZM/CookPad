/* Recipe mongoose model */
const mongoose = require('mongoose')

const IngredientSchma = new mongoose.Schema({
    name: String,
	quantity: String,
	unit: String
});

const Recipe = mongoose.model('Recipe', {
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	description: {
		type: String,
		required: false,
	},
	likes:{
		type: Number,
		required: true,
	},
	categories:{
		type: [Number],
		required: true,
	},
	creatorId:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	creatorUsername: {
		type: String,
		require: true,
	},
	steps:{
		type: [String],
		required: true,
	},
	ingredients:{
		type: [IngredientSchma],
		required: true,
	},
	imageUrl: {
		type: String,
		required: false,
	},
	imageId: {
		type: String,
		required: false,
	}
})

module.exports = { Recipe }