/* User mongoose model */
const mongoose = require('mongoose')

const User = mongoose.model('User', {
	username: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	password: {
		type: String,
        required: true,
		minlegth: 1
	}
})

module.exports = { User }