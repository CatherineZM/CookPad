import axios from "axios";
import swal from 'sweetalert';

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
    const request = new Request("users/login", {
        method: "post",
        body: JSON.stringify(loginComp.state),
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
            if(json.currentUser !== undefined){
                app.setState({ currentUser: json.currentUser })
            }
        })
        .catch(error=>{
            swal({title:"Oh No!", text:"Username does not exist or Password does not match!", icon:"error"});
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

// A function to send a POST request to signup a user
export const signup = async(signupComp) => {
    // create our request constructor with all the parameters we need
    const formData = new FormData();   
    formData.append('file', signupComp.state.profilePic);
    
    console.log(formData)
    try {
        const newUser = signupComp.state
        if (signupComp.state.profilePic){
            const res0 = await axios.post('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res0.data)
            newUser.imageUrl = res0.data.imageUrl
            newUser.imageId = res0.data.imageId
        }
        await axios.post("/api/users", newUser)
        swal({title:"Welcome!", text:"Sign up successfully!", icon:"success"});
        signupComp.props.history.push("/login");
    } catch(error) {
        swal({title:"Oops!", text:"Username already exist please try again!", icon:"error"});
        console.log(error)
    }    
}

// A function to send a GET request to get all users
export const getAllUser = (userListComp) => {
    const request = new Request("/api/users", {
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
            const users = []
            for (let user in json){
                users.push(json[user])
            }
            console.log(users)
            userListComp.setState({users: users})
            
        })
        .catch(error=>{
            console.log(error);
        })
}

// A function to send a GET request to get one user
export const getUser = (viewProfileComp, callback) => {
    const request = new Request(`/api/users/${viewProfileComp.props.match.params.uid}`, {
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
        .then(()=>{
            callback()
        })
        .catch(error=>{
            console.log(error);
        })

}

// a function to send a POST request to update image and a PATCH requset to update user profile
export const updateUser = async(comp, updateInfo, callback) => {
    try {
        if (updateInfo.profilePic){
            const formData = new FormData();   
            formData.append('file', updateInfo.profilePic);   
            const res0 = await axios.post('/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            updateInfo.imageUrl = res0.data.imageUrl
            updateInfo.imageId = res0.data.imageId
            comp.state.user.imageUrl = updateInfo.imageUrl
            comp.state.user.imageId = updateInfo.imageId
            
        }
        const res1 = await axios.patch(`/api/users/${comp.state.uid}`, updateInfo)
        console.log(res1)
        callback(comp)
    } catch (error){
        console.log(error)
    }
}

// a function to send a promote a regular user to admin
export const promoteUser = (uid) => {
    const request = new Request(`/api/users/${uid}`, {
        method: "PATCH",
        body: JSON.stringify({isAdmin: true}),
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
        })
        .catch(error=>{
            console.log(error);
        })
}

// A function to send a DELETE requset to delete user
export const deleteUser = (uid) => {
    const request = new Request(`/api/users/${uid}`, {
        method: "delete",
        body: JSON.stringify({deleteUser: true}),
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
        })
        .catch(error=>{
            console.log(error);
        })
}
