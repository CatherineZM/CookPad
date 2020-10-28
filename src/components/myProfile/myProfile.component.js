import React, { Component } from 'react';
import './style.css'
import Navbar from "../Navbar/navbar.component"

export default class MyProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid
        }
    }

    componentDidMount() {
    }


    render(){
        return(
            <div className="container-sm">
                <Navbar uid={this.state.uid}/>
                <div>this is my profile page</div>
            </div> 
        )
    }
} 