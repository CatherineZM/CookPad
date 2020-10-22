import { Button } from 'bootstrap';
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { User } from '../object';

const log = console.log;

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            username: '',
            password: '',
            users: this.props.appState.users,
            userCount: this.props.appState.userCount
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
        window.location = "..";
    }

    createUser(){
        const user = new User(this.state.username, this.state.password);
        this.state.users.push(user);
        this.setState({userCount: this.state.userCount+1});
    }

    validateUser(){
        for (let i = 0; i < this.state.userCount; i++){
            if (this.users[i].username == this.state.username) {
                log("username exists already");
                return false;
            }
        }
        return this.state.username.length > 0 && this.state.password.length > 0;
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
                        <Button type="submit" value="Sign Up" className="btn btn-primary" onClick={this.createUser} disabled={!this.validateUser()}>
                            Sign up
                            </Button>
                    </div>
                </form>
                <p className="text-center my-3">Already have an account?{" "} 
                    <Link to="/" className="text-blue-500 hover:text-blue-600">Login here</Link>
                </p>
            </div>  
        )
    }
} 