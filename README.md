# COOKPAD
Cookpad is a recipe sharing app that allows food lovers to write food blogs and recipes and beginners to learn cooking. 

## Get started
### Clone the repo
```
git clone https://github.com/csc309-fall-2020/team07.git
```

### Build the project
Instal the npm packages described in the package.json:
```
npm install
```

Build and open the project:
```
npm start
```

## login credentials
Login as a regular user:
      * username: user
  * password: user

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
  * username: user
  * password: user
3. On the homepage, you can:
  * **View all recipes**
  * **Search for a recipe** by applying filters on the left hand side of the homepage
  * **Like or dislike** the recipe by clicking on the heart icon
  * **add a recipe to "My Collection"** by clicking on the collection icon
  * **View a particular recipe** by cliking on the recipe image
4. Now, navigate yourself to the my collection page by clicking on "My Collection" in the navigation bar, you can:
  * **View all your collection**
  * **Like or dislike** any of the recipes in your collection
  * **Remove any recipe from your collection** by clicking on the collection icon (This feature will be implemented in phase2)
  * **View any of the recipe in your collection in details** by clicking on the recipe image
5. Click on any of the recipes in your collection. It will navigate you to the "view recipe" page. On this page, you can:
  * click on the recipe creator's name to **View the recipe creator’s profile**
  * **Delete a recipe** by clicking on the delete button
  * **Edit a recipe** by clicking on the edit button, the edit page allows you to:
     * remove or add any steps or ingredients
     * change the recipe name, description, cuisine type and recipe picture
     * Click "Update Recipe" to save your changes
6. Click on "My Profile" on the navgation bar. On this page, you can:
  * **View your own profile and your recipes**.
  * "Edit Profile" to **update your profile description and the size of your image**
7. Let's create a new recipe. Click on "Create a recipe" on the navigation bar to **Create your own recipe**:
  * Enter recipe name and description(optional)
  * Select Cuisine Type(s) using the drop down list and use the cross mark to remove a type
  * click on "add ingredients" to add a new ingredient and use the drop down list to select measurements.
  * click on "add steps" to add a new step
  * You can remove an ingredient or a step by click on the "remove" button
  * You can upload a picture of your recipe
8. You can **go back to home page** by clicking on "COOKPAD" in the navigation bar
9. Click on "Logout" on the navgation bar to **Logout**

## Admin User Sample Workflow:
1. Login in as as admin:
  * username: admin
  * password: admin
2. An admin can **View any user's profile** by clicking on "View Profile" button
2. An admin can **Ban users** by clicking on "Ban" button
3. An admin can **Promote users as admins** by clicking on "Promote" button

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
