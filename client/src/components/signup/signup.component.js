import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'react-avatar-edit';
import {signup} from "../../actions/user";
import {Container} from "@material-ui/core"
import cookpadIcon from '../homePage/images/cookpad.png'
import './signup.css'

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

    onImageLoad=(img)=>{
        this.setState({profilePic: img});
        console.log(img)
    }

    onClose=()=>{
        this.setState({preview: null})
    }
      
    onCrop=(preview)=>{
        const img = new Blob([preview], {type: "image/png"})
        
        this.setState({profilePic: img})
        console.log(this.state.profilePic)
    }

    onChangeDescription = (e)=>{
        e.preventDefault();
        this.setState({ description: e.target.value });
    }

    onSubmit=(e, app)=>{
        e.preventDefault();
        if (this.validator()){
            signup(this, app);
        }
        console.log(this.state)
    }

    validator(){
        let isValid = true;
        
        if (this.state.username.length < 1){
            isValid = false;
            alert("Username cannot be empty");
            return isValid;
        }
        if (this.state.password.length < 4){
            isValid = false;
            alert("Password needs a minimum length of 4");
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
                            width={420}
                            height={250} 
                            round={true}
                            label={"Choose a profile picture"}
                            onFileLoad={this.onImageLoad}
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