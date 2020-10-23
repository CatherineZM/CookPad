import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './navbar.css'
import cookpadIcon from '../images/cookpad.png'

export default class Navbar extends Component {
    render(){
        return(
            <div id="navbar">
                <ul>
                    <li><img src={cookpadIcon} alt="cookpad" width="50px" height="50px"/><Link to="/homepage/1">COOKPAD</Link></li>
                    <li id="first-item"><Link to="/addrecipe/1">Create a Recipe</Link></li>
                    <li><Link to="/myrecipes/1">My Recipes</Link></li>
                    <li><Link to="/myprofile/1">My Profile</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </div>
        )
    }
}