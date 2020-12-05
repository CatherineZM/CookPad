import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {login} from "../../actions/user";
import {Container} from "@material-ui/core"
import cookpadIcon from '../homePage/images/cookpad.png'
import './login.css'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.props.history.push("/login");
        this.state = {
            username: '',
            password: '',
        }
    }

    onChangeUsername=(e)=>{ this.setState({ username: e.target.value }); }
    onChangePassword=(e)=>{ this.setState({ password: e.target.value }); }

    onSubmit=(e, app)=>{
        e.preventDefault();
        login(this, app);
    }

    render(){
        const { app } = this.props
        return(
            <div className="login-page">
            <Container maxWidth='md'> 
                <div className = "logo">
                    <img src={cookpadIcon} alt="cookpad"/>
                    <span className = "name">COOKPAD</span>
                </div>
                <form className="login-form" onSubmit={(e)=>this.onSubmit(e, app)}>
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