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
		required: false
	}
})

module.exports = { Recipe }