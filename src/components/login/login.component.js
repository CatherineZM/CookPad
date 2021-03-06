import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './login.css'
import Container from "@material-ui/core/Container"
import cookpadIcon from '../homePage/images/cookpad.png'

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
        // fetch users data from the backend database and perform the check
        // for now hardcode admin and user
        if (this.state.username === "admin" && this.state.password === "admin"){
            window.location = '/adminpage/0';
        } else if(this.state.username === "user" && this.state.password === "user") {
            window.location = '/homepage/1';
        } else {
            alert("Username does not exist or Password does not match!");
        }     
    }

    render(){
        return(
            <div className="login-page">
            
            
            <Container maxWidth='md'> 
                <div className = "logo">
                    <img src={cookpadIcon} alt="cookpad"/>
                    <span className = "name">COOKPAD</span>
                </div>
                <form className="login-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="username" required placeholder="E.g: 123" className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" required placeholder="Your Password" className="form-control" value={this.state.password} onChange={this.onChangePassword}/>
                    </div>
                    <div id="login-button" className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                </form>
                <div className = "link-signup">Don't have an account?{" "}
                <Link to='signup'>Sign up here</Link>
                <br/>
                </div>
            </Container>  
            </div>
        )
    }
} 