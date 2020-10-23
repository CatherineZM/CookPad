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