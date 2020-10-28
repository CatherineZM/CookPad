export class User {
    constructor(id, username, password, isAdmin = false) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.isAdmin = isAdmin;
        // fields can be edited or added after signup
        this.gender = null;
        this.favCuisine = null;
    }
};

export class NewRecipe {
    cosntructor(RecipeName, Ingredients, Steps) {
        this.RecipeName = RecipeName;
        this.Ingredients = Ingredients; 
        this.Steps = Steps; 
        //optional content
        this.Description = null;
        this.RecipeImage = null;
    }
};