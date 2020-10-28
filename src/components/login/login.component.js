import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style.css'

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            users: this.props.appState.users,
            userCount: this.props.appState.userCount
        }
    }

    onChangeUsername=(e)=>{
        this.setState({ username: e.target.value });
    }
    
    onChangePassword=(e)=>{
        this.setState({ password: e.target.value });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        if (this.checkPassword()){
            const user = this.state.users.find((user)=>{return this.state.username === user.username;});
            if (user.isAdmin){
                window.location = '/adminpage';
            } else {
                window.location = '/homepage/1';
            }
            
        }
    }

    checkPassword=()=>{
        if (!this.state.users.some((user)=>{return this.state.username === user.username;})){
            alert("Username does not exist!");
            return false;
        } 
        const user = this.state.users.find((user)=>{return this.state.username === user.username;});
        if (user.password === this.state.password){
            return true;
        } else {
            alert("Password does not match!");
            return false;
        }
    }

    validateUser=()=>{
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
                        <input type="submit" value="Login" className="btn btn-primary" disabled={!this.validateUser()}/>
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