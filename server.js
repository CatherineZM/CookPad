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

// uploading files
const fileUpload = require('express-fileUpload');
app.use(fileUpload());
app.post('/upload', (req, res) => {
    console.log(req);
    if(req.files === null){
        return res.status(400).json({ msg: 'No file uploaded'});
    }
    
    const file = req.files.file;
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err)
        }
    })

    res.json({filePath: `/uploads/${file.name}`});
})


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
        isAdmin: false,
        likedRecipes: [],
        collectedRecipes: [],
        myRecipes: []
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

app.get('/api/users', mongoChecker, async(req, res)=>{
	
	try{
        const user = await User.find()  
        res.send(user)
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

/*
add a new recipe to recipe lists
{
    "likedRecipes": <rid>,
    "collectedRecipes": <rid>,
    "myRecipes": <rid>
}
*/
app.post('/api/users/:uid', [uidValidator, mongoChecker], async(req, res)=>{
	
    const uid = req.params.uid;
    const idToPush = {}

    if (req.body.likedRecipes) {
        idToPush.likedRecipes = req.body.likedRecipes
    }
    if (req.body.collectedRecipes){
        idToPush.collectedRecipes = req.body.collectedRecipes
    }
    if (req.body.myRecipes) {
        idToPush.myRecipes = req.body.myRecipes
    }

	try{
        const user = await User.findOneAndUpdate({_id: uid}, {$push: idToPush}, {new: true, useFindAndModify: false})
        if (!user){
            res.status(404).send("Resource not found")
        } else {
            res.send(user)
        }
		
	} catch(error) {
        log(error)
		if(isMongoError(error)){
			res.status(500).send('Internal Server Error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

/*
add a new recipe to recipe lists
{
    "likedRecipes": <rid>,
    "collectedRecipes": <rid>,
    "myRecipes": <rid>
}
*/
app.delete('/api/users/:uid', [uidValidator, mongoChecker], async(req, res)=>{
	
    const uid = req.params.uid;
    const idToDelete = {}

    if (req.body.likedRecipes) {
        idToDelete.likedRecipes = req.body.likedRecipes
    }
    if (req.body.collectedRecipes){
        idToDelete.collectedRecipes = req.body.collectedRecipes
    }
    if (req.body.myRecipes) {
        idToDelete.myRecipes = req.body.myRecipes
    }

	try{
        const user = await User.findOneAndUpdate({_id: uid}, {$pull: idToDelete}, {new: true, useFindAndModify: false})
        if (!user){
            res.status(404).send("Resource not found")
        } else {
            res.send(user)
        }
		
	} catch(error) {
        log(error)
		if(isMongoError(error)){
			res.status(500).send('Internal Server Error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

/*
update a user
{
    "password": <new password>,
    "description": <new description>,
    "isAdmin": <boolean>
}
*/

app.patch('/api/users/:uid', [uidValidator, mongoChecker], async(req, res)=>{
	
    const uid = req.params.uid;
    const FieldToUpdate = {}

    

	try{
        const user = await User.findById(uid)
        if (!user){
            res.status(404).send("Resource not found")
        } else {
            if (req.body.password) {
                user.password = req.body.password
            }
            if (req.body.description){
                user.description = req.body.description
            }
            if (req.body.isAdmin === true || req.body.isAdmin === false) {
                user.isAdmin = req.body.isAdmin
            }
            
            const newUser = await user.save()
            res.send(newUser)
        }
	} catch(error) {
		if(isMongoError(error)){
			res.status(500).send('Internal Server Error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})




// User API Route
app.post('/api/recipes', mongoChecker, async(req, res)=>{
    // create a new recipe
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        likes: 0,
        categories: req.body.categories,
        creatorId: req.body.creatorId,
        creatorUsername: req.body.creatorUsername,
        steps: req.body.steps,
        ingredients: req.body.ingredients,
        filePath: req.body.filePath,
    })

    try{
        const newRecipe = await recipe.save()
		res.send(newRecipe)
    } catch(error) {
        if(isMongoError(error)){
            res.status(500).send('Internal Server Error')
        } else {
            res.status(400).send('Bad Request')
        }
    }
})

//get all recipes
app.get('/api/recipes', mongoChecker, async(req, res)=>{
    try{
        const recipes = await Recipe.find()
		res.send({recipes})
    } catch(error) {
        log(error)
        res.status(500).send('Internal Server Error')
    }
})

//get recipe by its id
app.get('/api/recipes/:rid', [ridValidator, mongoChecker],async (req, res) =>{
    const rid = req.params.rid

	try {
		const recipe = await Recipe.findById(rid)
		if (!recipe) {
			res.status(404).send('Resource not found')  
		} else {   
			res.send(recipe)
		}
	} catch(error) {
		if(isMongoError(error)){
			res.status(500).send('Internal Server Error')
		} else {
			res.status(400).send('Bad Request')
		}  
	}
})

//edit recipe
app.patch('/api/recipes/:uid/:rid', [uidValidator, ridValidator, mongoChecker], async (req, res) =>{
    const uid = req.params.uid
    const rid = req.params.rid

    try{
        const recipeToEdit = await Recipe.findById(rid)
        if(recipeToEdit.creator == uid){
            if(!recipeToEdit){   
                res.status(404).send('Resource not found')  
            } else {   
                recipeToEdit.name = req.body.name
                recipeToEdit.description = req.body.description
                recipeToEdit.categories = req.body.categories
                recipeToEdit.steps = req.body.steps
                recipeToEdit.ingredients = req.body.ingredients
                if(req.body.filePath != null){
                    recipeToEdit.filePath = req.body.filePath
                }
                recipeToEdit.save()
                res.send(recipeToEdit)
            }
        }else{
            res.status(404).send('No authentication to edit')
        }
    } catch(error) {
        if(isMongoError(error)){
            res.status(500).send('Internal Server Error')
        } else {
            res.status(400).send('Bad Request')
        }
    }
})

// delete a recipe
app.delete('/api/recipes/:rid', [ridValidator, mongoChecker], async(req, res) => {
    try{
        const recipe = await Recipe.findByIdAndDelete(req.params.rid);
        return res.send(recipe);
    } catch(error) {
        if(isMongoError(error)){
			res.status(500).send('Internal Server Error')
		} else {
			res.status(400).send('Bad Request')
		}  
    }
});
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
