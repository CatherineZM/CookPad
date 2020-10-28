import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style.css'
import NavbarEmpty from "../Navbar-empty/navbar-empty"

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    onChangeUsername=(e)=>{ this.setState({ username: e.target.value }); }
    onChangePassword=(e)=>{ this.setState({ password: e.target.value }); }

    onSubmit=(e)=>{
        e.preventDefault();
        // fetch users data from the backend data base and perform the check
        // for now hardcode admin and user
        if (this.state.username === "admin" && this.state.password === "admin"){
            window.location = '/adminpage';
        } else if(this.state.username === "user" && this.state.password === "user") {
            window.location = '/homepage/1';
        } else {
            alert("Username does not exist or Password does not match!");
        }     
    }

    render(){
        return(
            <div className="container">
                <NavbarEmpty is_adminpage={false}/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="username" required placeholder="E.g: 123" className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" required placeholder="Your Password" className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
                <p className="text-center my-3">Don't have an account?{" "}
                <Link to='signup' className="text-blue-500 hover:text-blue-600">Sign up here</Link>
                <br/>
                </p>
            </div>  
        )
    }
} 