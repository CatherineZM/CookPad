import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { User } from '../../object';
import './style.css'
import NavbarEmpty from "../Navbar-empty/navbar-empty"

export default class Signup extends Component {
    constructor(props){
        super(props);        
        this.state = {
            username: '',
            password: '',
            users: this.props.appState.users,
            userCount: this.props.appState.userCount
        }
    }

    onChangeUsername = (e)=>{
        e.preventDefault();
        this.setState({ username: e.target.value });
    }
     
    onChangePassword = (e)=>{
        e.preventDefault();
        this.setState({ password: e.target.value });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.createUser();
        window.location = "..";
    }

    createUser=()=>{
        const user = new User(0, this.state.username, this.state.password);
        this.state.users.push(user);
        this.setState({userCount: this.state.userCount+1});
    }

    validateUser=()=>{
        return this.state.username.length > 0 && this.state.password.length > 0;
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
                        <input type="submit" value="Signup" className="btn btn-primary" disabled={!this.validateUser()}/>
                    </div>
                </form>
                <p className="text-center my-3">Already have an account?{" "} 
                    <Link to="/" className="text-blue-500 hover:text-blue-600">Login here</Link>
                </p>
            </div>  
        );
    }
} 