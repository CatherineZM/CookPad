import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const log = console.log;

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        // fields can be edited or added after signup
        this.gender = null;
        this.favCuisine = null;
    }
}
export default class Signup extends Component {
    constructor(props){
        super();
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
            password: '',
            users: [],
            userCount: 0
        }
    }

    onChangeUsername(e){
        e.preventDefault();
        this.setState({ username: e.target.value });
    }
     
    onChangePassword(e){
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        this.createUser();
        log(`${this.state.users[0].username}`);
        window.location = "./../homepage/:uid";
    }

    render(){
        return(
            <div className="container">
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
                        <input type="submit" value="Sign Up" className="btn btn-primary"/>
                    </div>
                </form>
                <p className="text-center my-3">Already have an account?{" "} 
                    <Link to="/" className="text-blue-500 hover:text-blue-600">Login here</Link>
                </p>
            </div>  
        )
    }

    createUser(){
        const user = new User(this.state.username, this.state.password);
        this.state.users.push(user);
        this.setState({userCount: this.state.userCount+1});
    }
} 