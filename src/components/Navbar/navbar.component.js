import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import cookpadIcon from '../homePage/images/cookpad.png'

export default class Navbar extends Component {
    render(){
        const {uid} = this.props;
        return(
            <div id="navbar">
                <ul>
                    <li><img src={cookpadIcon} alt="cookpad"/><Link to={"/homepage/"+uid}>COOKPAD</Link></li>
                    <li id="first-item"><Link to={"/addrecipe/"+uid}>Create a Recipe</Link></li>
                    <li><Link to={"/myrecipes/"+uid}>My Recipes</Link></li>
                    <li><Link to={"/mycollection/"+uid}>My Collection</Link></li>
                    <li><Link to={"/myprofile/"+uid}>My Profile</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </div>
        )
    }
}