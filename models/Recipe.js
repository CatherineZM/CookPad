/* Recipe mongoose model */
const mongoose = require('mongoose')

const Recipe = mongoose.model('Recipe', {
	title: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	description: {
		type: String,
		required: false,
		minlength: 1,
	},
	liked_uid:{
		type: [mongoose.Schema.Types.ObjectId],
		required: true
	},
	likes:{
		type: Number,
		required: true,
	},
	collected_uid:{
		type: [mongoose.Schema.Types.ObjectId],
		required: true,
	},
	categories:{
		type: [Number],
		required: true,
	},
	creator:{
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
})

module.exports = { Recipe }