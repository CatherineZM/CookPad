/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')
const express = require('express')
const app = express();

// Cross-origin resource sharing
const cors = require('cors');
app.use(cors());

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose');
mongoose.set('bufferCommands', false);
mongoose.set('useFindAndModify', false);

// import the mongoose models
const { User } = require('./models/User');
const { Recipe } = require('./models/Recipe');

// to validate object IDs
const { ObjectID } = require('mongodb');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

// multipart middleware: allows you to access uploaded file from req.file
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dcbkumvzn',
    api_key: '724245945181957',
    api_secret: 'Fz7Syp9Ak3PHwdbwS0DmePhWXjQ'
});

/****************************** Helper functions below **********************************/
// checks for first error returned by promise rejection if Mongo database suddently disconnects
function isMongoError(error) {
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

// check if uid is valid ObjectID
const uidValidator = (req, res, next) => {
    const id = req.params.uid;
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID")
		return; 
    } else {
        next();
    }
}

// check if rid is valid ObjectID
const ridValidator = (req, res, next) => {
    const id = req.params.rid;
    if (!ObjectID.isValid(id)) {
        res.status(404).send("Invalid ID")
		return; 
    } else {
        next();
    }
}

/****************************** Session Handling **********************************/
// Create a session and session cookie
app.use(
    session({
        secret: "our hardcoded secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000,
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
            req.session.user = user;
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

        res.send({ currentUser: req.session.user });
    } else {
        res.status(401).send();
    }
});

/****************************** Image API Routes **********************************/
// a POST route to *create* an image
app.post("/images", multipartMiddleware, (req, res) => {
    // Use uploader.upload API to upload image to cloudinary server.
    cloudinary.uploader.upload(
        req.files.file.path, // req.files contains uploaded files
        function (result) {
            // Save image to the database
            res.send({imageId: result.public_id, imageUrl: result.url});
        });
});

/// a DELETE route to remove an image by its id.
app.delete("/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;
    
    // Delete an image by its id on the cloudinary server
    cloudinary.uploader.destroy(imageId, function (result) {
        // Delete the image from the database
        Image.findOneAndRemove({ image_id: imageId })
            .then(img => {
                if (!img) {
                    res.status(404).send();
                } else {
                    res.send(img);
                }
            })
            .catch(error => {
                res.status(500).send(); // server error, could not delete.
            });
    });
});


/****************************** User API Routes **********************************/
// create a user
app.post('/api/users', mongoChecker, async(req, res)=>{
	const user = new User({
		username: req.body.username,
		password: req.body.password,
        description: req.body.description,
        isAdmin: false,
        likedRecipes: [],
        collectedRecipes: [],
        myRecipes: [],
        imageUrl: req.body.imageUrl,
        imageId: req.body.imageId
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

// get all users
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

// get user by uid
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

// add to user's likedRecipes, collectedRecipes, myRecipes
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

// remove from user's likedRecipes, collectedRecipes, myRecipes
app.delete('/api/users/:uid', [uidValidator, mongoChecker], async(req, res)=>{
    const uid = req.params.uid;

    // Remove user
    if (req.body.deleteUser){
        try{
            let user = await User.findById(uid);
            cloudinary.uploader.destroy(user.imageId, function (result) {})
            user = await User.findByIdAndDelete(uid);
            return res.send(user);
        } catch(error) {
            if(isMongoError(error)){
                res.status(500).send('Internal Server Error')
            } else {
                res.status(400).send('Bad Request')
            }  
        }
    } else { //remove certain recipes from user recipe lists
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
    }
})

// update a user's profile
app.patch('/api/users/:uid', [uidValidator, mongoChecker], async(req, res)=>{	
    const uid = req.params.uid;

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
            if (req.body.imageUrl){
                user.imageUrl = req.body.imageUrl
                user.imageId = req.body.imageId
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

/****************************** Recipe API Routes **********************************/
// create a recipe
app.post('/api/recipes', mongoChecker, async(req, res)=>{
    //initialize recipe information
    const recipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        likes: 0,
        categories: req.body.categories,
        creatorId: req.body.creatorId,
        creatorUsername: req.body.creatorUsername,
        steps: req.body.steps,
        ingredients: req.body.ingredients,
        imageUrl: req.body.imageUrl,
        imageId: req.body.imageId,
    })

    try{
        //send the recipe to the server
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

// get all recipes
app.get('/api/recipes', mongoChecker, async(req, res)=>{
    try{
        //grab all the recipes that could find
        const recipes = await Recipe.find()
        //send all the objects to the server
		res.send({recipes})
    } catch(error) {
        log(error)
        res.status(500).send('Internal Server Error')
    }
})

// get a recipe by its id
app.get('/api/recipes/:rid', [ridValidator, mongoChecker], async(req, res) =>{
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

// edit recipe
app.patch('/api/recipes/:rid', [ridValidator, mongoChecker], async (req, res) =>{
    const rid = req.params.rid

    try{
        const recipeToEdit = await Recipe.findById(rid)
        if (!recipeToEdit){
            res.status(404).send("Resource not found")
        } else {
            //only change the value of objects if it's changed 
            if(req.body.name){
                recipeToEdit.name = req.body.name
            }
            if(req.body.description){
                recipeToEdit.description = req.body.description
            }
            if(typeof req.body.likes !== 'undefined'){
                recipeToEdit.likes = req.body.likes
            }
            if(req.body.categories){
                recipeToEdit.categories = req.body.categories
            }
            if(req.body.steps){
                recipeToEdit.steps = req.body.steps
            }
            if(req.body.ingredients){
                recipeToEdit.ingredients = req.body.ingredients
            }
            if(req.body.imageUrl != null){
                recipeToEdit.imageUrl = req.body.imageUrl
                recipeToEdit.imageId = req.body.imageId
            }
            const newRecipe = await recipeToEdit.save()
            res.send(newRecipe)
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
        const recipe1 = await Recipe.findById(req.params.rid);
        //delete the image associated to the recipe
        cloudinary.uploader.destroy(recipe1.imageId, function (result) {})
        //delete the recipe itself 
        const recipe2 = await Recipe.findByIdAndDelete(req.params.rid);
        return res.send(recipe2);
    } catch(error) {
        if(isMongoError(error)){
			res.status(500).send('Internal Server Error')
		} else {
			res.status(400).send('Bad Request')
		}  
    }
});

/****************************** Webpage Routes **********************************/
// Serve the build
app.use(express.static(path.join(__dirname, "/client/build")));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    // check for page routes that we expect in the frontend to provide correct status code.
    const goodPageRoutes = ["/", "/login", "/homepage"];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404);
    }
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/********************************************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
