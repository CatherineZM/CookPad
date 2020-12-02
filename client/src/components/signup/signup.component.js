import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'react-avatar-edit';

import {signup} from "../../actions/user";
import './signup.css'
import Container from "@material-ui/core/Container"
import cookpadIcon from '../homePage/images/cookpad.png'

export default class Signup extends Component {
    constructor(props){
        super(props);     
        this.props.history.push("/signup");   
        this.state = {
            username: '',
            password: '',
            profilePic: null,
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

    onImageLoad=(e)=>{
        this.setState({profilePic: e.target.value});
    }

    onClose=(e)=>{
        this.setState({preview: null})
    }
      
    onCrop=(e,preview)=>{
        this.setState({preview})
    }

    onChangeDescription = (e)=>{
        e.preventDefault();
        this.setState({ description: e.target.value });
    }

    onSubmit=(e, app)=>{
        e.preventDefault();
        
        // create a new user object and 
        // requires server calls to push the user to backend database
        if (this.validator()){
            signup(this, app);
            this.props.history.push("/login");
        }
    }

    validator(){
        let isValid = true;
        
        if (this.state.username.length < 1){
            isValid = false;
            alert("Username cannot be empty");
            return isValid;
        }
        if (this.state.password.length < 5){
            isValid = false;
            alert("Password needs a minimum length of 5");
            return isValid;
        }
        return isValid;
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
                    <div className="form-group" id="upload-pic">
                        <Avatar 
                            width={430}
                            height={250} 
                            round={true} 
                            label={"Choose a profile picture"}
                            onImageLoad={this.onImageLoad}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            src={this.state.profilePic}
                        /> 
                    </div> 
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
                <Link to='/'>Log in here</Link>
                <br/>
                </div>
            </Container>  
            </div>
        );
    }
} 