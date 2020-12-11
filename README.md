# COOKPAD
Cookpad is a recipe sharing app that allows food lovers to write food blogs and recipes and beginners to learn cooking. 

## Basic Features
In our web app, users will be able to post their recipes with steps and ingredients. To search for a recipe, users can apply different filters to filter out unwanted recipes. They can also add a recipe to their own collection so that it is easier for them to replicate it. Users can also give likes to a recipes and they will be able to get a sense of whether the recipe is worth trying by looking at the number of likes. The homepage will also display the top recipes for users in a slideshow. 

## URL to the Deployed Web App
```
https://dry-garden-09111.herokuapp.com/
```

## Get Started
### Clone the repo
```
git clone https://github.com/csc309-fall-2020/team07.git
```

### Build the project
Instal the npm packages described in the package.json:
```
npm install
```

Build and open on local host:
```
npm run build-run
```

## Login Credentials
Login as a regular user:
  * username: user
  * password: user

or

  * username: user2
  * password: user2

Login as an admin:
  * username: admin
  * password: admin

## Regular User Sample Workflow:
1. Click on "Sign up here" on the login page to navigate to the signup page. To **Sign up**, You need to enter the following fields:
  * Username
  * Password
  * Description (optional)
  * Profile picture
  
2. Click on "Login here" on the sign up page to navigate to the login page. To **Login** as a regular user, enter:
  * Username
  * Password
  
3. On the homepage, you can:
  * **View all recipes**
  * **Search for a recipe** by applying filters on the left hand side of the homepage
  * **Like or dislike** the recipe by clicking on the favourite icon
  * **Add a recipe to "My Collection"** by clicking on the collection icon
  * **View a particular recipe** by cliking on the recipe image
  * On the top recipes panels to check the top recipes, click the favourite icons to give a like and click on the name of the recipe to view the recipe
  * You can also check the details about the top recipes by clicking on the images below the "top recipes" table
  * Use the next and previous arrow on the slide show to switch between recipes
  
4. Click on "My Profile" on the navgation bar. On this page, you can:
  * **View your own profile, your recipes, and your collection**.
  * "Edit Profile" to **update your profile description, the size of your image, and password**
  * Click on "View" to expand "my recipes or my collections"

5. Click on any of the recipes on "My Profile" page. It will navigate you to the "view recipe" page. On this page, you can:
  * Click on the recipe creator's name to **View the recipe creator’s profile**
  * **Delete a recipe** by clicking on the delete button
  * **Edit a recipe** by clicking on the edit button, the edit page allows you to:
     * Remove or add any steps or ingredients
     * Change the recipe name, description, cuisine type and recipe picture
     * Click "Update Recipe" to save your changes
  * You can also checkout some recommended recipes on the right of the page

6. Let's create a new recipe. Click on "Create a recipe" on the navigation bar to **Create your own recipe**:
  * Enter recipe name and description(optional)
  * Select Cuisine Type(s) using the drop down list and use the cross mark to remove a type
  * Click on "add ingredients" to add a new ingredient and use the drop down list to select measurements.
  * Click on "add steps" to add a new step
  * You can remove an ingredient or a step by click on the "remove" button
  * You can upload a picture of your recipe

7. You can **go back to home page** by clicking on "COOKPAD" or "Home Page" in the navgation bar

8. Click on "Logout" on the navgation bar to **Logout**

## Admin User Sample Workflow:
1. Login in as as admin:
  * username: admin
  * password: admin
  
2. Let's go check out all users by clicking on "Admin Page" in the navgation bar. On this page, An admin can:
 * **View any user's profile** by clicking on "View Profile" button
 * **Delete users** by clicking on "Delete" button
 * **Promote users as admins** by clicking on "Promote" button

3. An admin can also **View HomePage** and **Create a recipe** by clicking on corresponding items in the navgation bar.

## Third Party Libraries:
1. Bootstrap
2. material ui
2. react-icons
3. react-uid
4. react-router-dom
5. react-images-upload
6. multiselect-react-dropdown
7. react-dropdown
8. react-avatar
9. react-expand-collapse
10. react-select
11. cloudinary
12. cors
13. connect-multiparty

## Overview of the Routes
There are two models in the project: user and recipe. The routes for each model will be explained in this section.

### User Routes
#### Creating a user 
```
POST '/api/users'
req.body = 
{
        "username": "yoshi",
	"password": "123456",
        "description": "I love Chinese food",
        "imageUrl": "profileimageUrl", // this is obtained from cloudinary.uploader.upload
        "imageId": "profileimageId" // this is obtained from cloudinary.uploader.upload
}
Note: username needs to be unique
returns a user document
```

#### Getting all users 
```
GET '/api/users'
returns a list of user document
```

#### Getting one user
```
GET '/api/users/:uid'
returns the specified user
```

#### Updating user profile
 * purpose: this is called whenever users change profile information
```
PATCH'/api/users/:uid'
req.body = 
{
	"password": "123456",
        "description": "I love Chinese food",
        "imageUrl": "profileimageUrl", // this is obtained from cloudinary.uploader.upload
        "imageId": "profileimageId" // this is obtained from cloudinary.uploader.upload
}
returns the updated user document
```

#### Adding to user's recipe list
 * purpose: this is called whenever user create a new recipe or add a recipe to their collections or like a recipe
 * Note: the propertites fields are not all required.
```
POST '/api/users/:uid'
req.body = 
{
    "likedRecipes": <rid>,
    "collectedRecipes": <rid>,
    "myRecipes": <rid>
}
returns the updated user document
```

#### Deleting from user's recipe list
 * purpose: this is called whenever user delete a new recipe or remove a recipe from their collections or dislike a recipe
 * Note: the propertites fields are not all required.
```
DELETE '/api/users/:uid'
req.body = 
{
    "likedRecipes": <rid>,
    "collectedRecipes": <rid>,
    "myRecipes": <rid>
}
returns the updated user document
```

#### Deleting user
```
DELETE '/api/users/:uid'
req.body = 
{
    "deleteUser": "true"
}
returns the deleted user document
```


### Recipe Routes
#### Creating a recipe
```
POST '/api/recipes'
req.body = 
{
        "name": "Butter Chicken",
        "description": "Butter Chicken",
        "categories": [1,2,3],
        "creatorId": "uid", // this is the _uid field of user
        "creatorUsername": "user",
        "steps": ["Add the chopped chicken into a medium bowl", "Mix well to coat and cover chicken"],
        "ingredients": [{"name": "salt", "quantity": 1, "unit": "kg"}],
        "imageUrl": "recipeimageUrl", // this is obtained from cloudinary.uploader.upload
        "imageId": "recipeimageId", // this is obtained from cloudinary.uploader.upload
}
returns the created recipe document
```

#### Getting all recipes
```
GET '/api/recipes'
returns a list of recipe document
```

#### Getting one recipe
```
GET '/api/recipes/:rid'
returns the specified recipe document
```

#### Deleting recipe
```
DELETE '/api/recipes/:rid'
returns the deleted recipe document
```

#### Updating recipe
```
PATCH '/api/recipes/:rid'
req.body = 
{
         "name": "Pie",
         "description": "Pie",
         "likes": 123,
         "categories": [0,1],
         "steps": ["Dice unsalted butter into small cubes", "Add butter, flour, and salt into a food processor"]
         "ingredients": [{"name": "sugar", "quantity": 1, "unit": "kg"}]
         "imageUrl": "recipeimageUrl", // this is obtained from cloudinary.uploader.upload
         "imageId": "recipeimageId", // this is obtained from cloudinary.uploader.upload
}
returns the updated recipe document
```


