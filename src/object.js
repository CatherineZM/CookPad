export class User {
    constructor(username, password, isAdmin = false) {
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
        // fields can be edited or added after signup
        this.gender = null;
        this.favCuisine = null;
    }
};