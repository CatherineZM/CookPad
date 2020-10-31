import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './style.css'
import NavbarEmpty from "../Navbar-empty/navbar-empty"
import Container from "@material-ui/core/Container"

export default class Signup extends Component {
    constructor(props){
        super(props);        
        this.state = {
            username: '',
            password: '',
            description: ''
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

    onChangeDescription = (e)=>{
        e.preventDefault();
        this.setState({ description: e.target.value });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        // create a new user object and push the user to backend database
        window.location = "..";
    }

    render(){
        return(
            <div>
            <NavbarEmpty is_adminpage={false}/>
            <Container maxWidth='md'>
                
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
                        <label>Description: </label>
                        <input type="text" placeholder="Tell me about yourself" className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Signup" className="btn btn-primary"/>
                    </div>
                </form>
                <p className="text-center my-3">Already have an account?{" "} 
                    <Link to="/" className="text-blue-500 hover:text-blue-600">Login here</Link>
                </p>
            </Container>  
            </div>
        );
    }
} 