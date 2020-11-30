/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// Cross-origin resource sharing
const cors = require('cors');
app.use(cors());

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.

// import the mongoose models
const { User } = require('./models/User')
const { Recipe } = require('./models/Recipe')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require("express-session");
const e = require('express');
app.use(bodyParser.urlencoded({ extended: true }));

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}

const uidValidator = (req, res, next) => {
    const id = req.params.uid;

    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID")
		return; 
    } else {
        next();
    }
}

const ridValidator = (req, res, next) => {
    const id = req.params.rid;
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID")
		return; 
    } else {
        next();
    }
}

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

/*** Session handling **************************************/
// Create a session and session cookie
app.use(
    session({
        secret: "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // log(username, password);
    User.findByUsernamePassword(username, password)
        .then(user => {
            req.session.user = user._id;
            req.session.username = user.username;
            res.send({ currentUser: user });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a user is logged in on the session
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.username });
    } else {
        res.status(401).send();
    }
});


/*** API Routes below ************************************/
// User API Route
// create a user
app.post('/api/users', mongoChecker, async(req, res)=>{
	// create a new user
	const user = new User({
		username: req.body.username,
		password: req.body.password,
        description: req.body.description,
        isAdmin: false
	})

	try{
		const newUser = await user.save()
		res.send(newUser)
	} catch(error) {
		if(isMongoError(error)){
			res.status(500).send('Internal Server Error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

app.get('/api/users/:uid', [uidValidator, mongoChecker], async(req, res)=>{
	
	const uid = req.params.uid;

	try{
        const user = await User.findById(uid)
        if (!user){
            res.status(404).send("Resource not found")
        } else {
            res.send(user)
        }
		
	} catch(error) {
		if(isMongoError(error)){
			res.status(500).send('Internal Server Error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/homepage"];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
