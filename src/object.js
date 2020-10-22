export class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        // fields can be edited or added after signup
        this.gender = null;
        this.favCuisine = null;
    }
}