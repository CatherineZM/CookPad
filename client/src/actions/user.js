// send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = "/users/check-session";
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

// a function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
    // create our request constructor with all the parameters we need
    const request = new Request("users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    // send the request with fetch()
    fetch(request)
        .then(res=>{
            if(res.status === 200){
                return res.json();
            }
        })
        .then(json=>{
            console.log(json)
            if(json.currentUser !== undefined){
                app.setState({ currentUser: json.currentUser })
            }
        })
        .catch(error=>{
            alert("Username does not exist or Password does not match!");
            console.log(error);
        })
}

// A function to send a GET request to logout the current user
export const logout = (app) => {
    const url = "/users/logout";

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
                message: { type: "", body: "" }
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const signup = (signupComp) => {
    // create our request constructor with all the parameters we need
    const request = new Request("/api/users", {
        method: "post",
        body: JSON.stringify(signupComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    // send the request with fetch()
    fetch(request)
        .then(res=>{
            if(res.status === 200){
                return res.json();
            }
        })
        .then(json=>{
            console.log(json)
            alert("Sign up success!");
        })
        .catch(error=>{
            alert("Could not Sign up!");
            console.log(error);
        })
}

export const getUser = (viewProfileComp) => {
    const request = new Request(`/api/users/${viewProfileComp.state.uid}`, {
        method: "get",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
        .then(res=>{
            if(res.status === 200){
                return res.json();
            }
        })
        .then(json=>{
            console.log(json)
            viewProfileComp.setState({user: json})
            
        })
        .catch(error=>{
            console.log(error);
        })
}

// modify recipe list of the user
/*
add a new recipe to recipe lists
{
    "likedRecipes": <rid>,
    "collectedRecipes": <rid>,
    "myRecipes": <rid>
}
*/
export const addToRecipeList = (uid, recipeList) => {
    // create our request constructor with all the parameters we need
    const request = new Request(`/api/users/${uid}`, {
        method: "post",
        body: JSON.stringify(recipeList),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    console.log(request)
    // send the request with fetch()
    fetch(request)
        .then(res=>{
            if(res.status === 200){
                return res.json();
            }
        })
        .then(json=>{
            console.log(json)
        })
        .catch(error=>{
            console.log(error);
        })
}

/*
delete a new recipe to recipe lists
{
    "likedRecipes": <rid>,
    "collectedRecipes": <rid>,
    "myRecipes": <rid>
}
*/
export const DeleteFromRecipeList = (uid, recipeList) => {
    // create our request constructor with all the parameters we need
    const request = new Request(`/api/users/${uid}`, {
        method: "delete",
        body: JSON.stringify(recipeList),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    // send the request with fetch()
    fetch(request)
        .then(res=>{
            if(res.status === 200){
                return res.json();
            }
        })
        .then(json=>{
            console.log(json)
        })
        .catch(error=>{
            console.log(error);
        })
}