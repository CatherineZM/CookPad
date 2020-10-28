import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import cookpadIcon from '../homePage/images/cookpad.png'

export default class Navbar extends Component {
    render(){
        return(
            <div id="navbar">
                <ul>
                    <li><img src={cookpadIcon} alt="cookpad"/><Link to="/homepage/1">COOKPAD</Link></li>
                    <li id="first-item"><Link to="/addrecipe/1">Create a Recipe</Link></li>
                    <li><Link to="/myrecipes/1">My Recipes</Link></li>
                    <li><Link to="/mycollection/1">My Collection</Link></li>
                    <li><Link to="/myprofile/1">My Profile</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </div>
        )
    }
}