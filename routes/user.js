const router = require('express').Router();
const { User } = require('../models/User');
const { mongoose } = require('../db/mongoose')

/** User resource routes **/
// a POST route to *create* a user
// use http://localhost:5000/api/users/add to create a user
router.route('/add').post(async (req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	const user = new User({
		username: req.body.username,
		password: req.body.password
	})


	// Save user to the database
	try {
		const result = await user.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
})


// a GET route to get all users
// use http://localhost:5000/api/users/ to get all users
router.route('/').get(async (req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Get the users
	try {
		const users = await User.find()
		res.send(users)
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})



module.exports = router;