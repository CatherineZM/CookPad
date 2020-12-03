/* User mongoose model */
'use strict';

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
	}, 
	password: {
		type: String,
		required: true,
		minlength: 4
	},
	description: {
		type: String,
		required: false,
		minlength: 0
	},
	isAdmin:{
		type: Boolean,
		required: true
	},
	likedRecipes:{
		type: [mongoose.Schema.Types.ObjectId],
		required: false,
	},
	collectedRecipes:{
		type: [mongoose.Schema.Types.ObjectId],
		required: false,
	},
	myRecipes: {
		type: [mongoose.Schema.Types.ObjectId],
		required: false,
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

// This function will run immediately prior to saving the document
// in the database.
UserSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this 

	// First find the user by their username
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }