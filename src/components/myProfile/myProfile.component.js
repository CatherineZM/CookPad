import React, { Component } from 'react';
import './style.css'
import Navbar from "../Navbar/navbar.component"

export default class MyProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            username:"Nora", 
            description: "Hello World!"
        }
    }

    componentDidMount() {
        //  get user information from the database
    }

    editDescription = (e)=>{
        e.preventDefault();
        window.location = "/editprofile/" + this.state.uid
    }

    render(){
        return(
            <div className="container-sm">
                <Navbar uid={this.state.uid}/>
                <div>Username: {this.state.username}</div>
                <div>Description: {this.state.description}</div>
                <form onSubmit={this.editDescription}><input type="submit" value="Edit Description" className="btn btn-primary"/></form>
            </div> 
        )
    }
} 