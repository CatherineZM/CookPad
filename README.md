# COOKPAD
Cookpad is a recipe sharing app that allows food lovers to write food blogs and recipes and beginners to learn cooking. 

## Get started
### Clone the repo
```
git clone https://github.com/CatherineZM/CookPad.git
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
  * on the top recipes panels to check the top recipes, click the heart icons to give a like and click on the name of the recipe to view the recipe
  * You can also check the details about the top recipes by clicking on the images below the "top recipes" table
  * use the next and previous arrow on the slide show to switch between recipes (the slideshow can also autoplay)
  
4. Click on "My Profile" on the navgation bar. On this page, you can:
  * **View your own profile, your recipes, and your collection**.
  * "Edit Profile" to **update your profile description, the size of your image, and password**
  * Click on "View" to expand "my recipes or my collections"

5. Click on any of the recipes on "My Profile" page. It will navigate you to the "view recipe" page. On this page, you can:
  * click on the recipe creator's name to **View the recipe creator’s profile**
  * **Delete a recipe** by clicking on the delete button
  * **Edit a recipe** by clicking on the edit button, the edit page allows you to:
     * remove or add any steps or ingredients
     * change the recipe name, description, cuisine type and recipe picture
     * Click "Update Recipe" to save your changes
  * You can also checkout some recommended recipes on the right of the page

6. Let's create a new recipe. Click on "Create a recipe" on the navigation bar to **Create your own recipe**:
  * Enter recipe name and description(optional)
  * Select Cuisine Type(s) using the drop down list and use the cross mark to remove a type
  * click on "add ingredients" to add a new ingredient and use the drop down list to select measurements.
  * click on "add steps" to add a new step
  * You can remove an ingredient or a step by click on the "remove" button
  * You can upload a picture of your recipe

7. You can **go back to home page** by clicking on "COOKPAD" or "Home Page" in the navgation bar

8. Click on "Logout" on the navgation bar to **Logout**

## Admin User Sample Workflow:
1. Login in as as admin:
  * username: admin
  * password: admin
  
2. An admin can **View any user's profile** by clicking on "View Profile" button

2. An admin can **Ban users** by clicking on "Ban" button

3. An admin can **Promote users as admins** by clicking on "Promote" button

4. An admin can **View HomePage** by clicking on "HomePage" in the navgation bar. This allows admins to check if there are any inappropriate contents.

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
