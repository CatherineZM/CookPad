import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './signup.css'
import Container from "@material-ui/core/Container"
import cookpadIcon from '../homePage/images/cookpad.png'

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
            <div className="signup-page">
            
            
            <Container maxWidth='md'> 
                <div className = "logo">
                    <img src={cookpadIcon} alt="cookpad"/>
                    <span className = "name">COOKPAD</span>
                </div>
                <form className="signup-form" onSubmit={this.onSubmit}>
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
                        <input type="description" placeholder="Personal Description (Optional)" className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div id="signup-button" className="form-group">
                        <input type="submit" value="Signup" className="btn btn-primary"/>
                    </div>
                </form>
                <div className = "link-signup">Already have an account?{" "}
                <Link to='/' className="text-blue-500 hover:text-blue-600">Log in here</Link>
                <br/>
                </div>
            </Container>  
            </div>
        );
    }
} 