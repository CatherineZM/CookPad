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