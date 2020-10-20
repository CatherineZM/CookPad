import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Login extends Component {
    constructor(props){
        super();
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    
    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }   

    onSubmit(e){
        e.preventDefault();
        window.location = '/homepage/1';  
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" required placeholder="E.g: 123@gmail.com" className="form-control" value={this.state.email} onChange={this.onChangeEmail}/>
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
                <Link to="signUp" className="text-blue-500 hover:text-blue-600">Sign up here</Link>
                <br/>
                </p>
            </div>  
        )
    }
} 