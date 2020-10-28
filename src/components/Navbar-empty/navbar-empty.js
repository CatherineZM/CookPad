import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './style.css'
import cookpadIcon from '../homePage/images/cookpad.png'

export default class NavbarEmpty extends Component {
    render(){
        const {is_adminpage} = this.props;
        return(
            <div id="navbar-empty">
                <ul>
                    <li><img src={cookpadIcon} alt="cookpad"/>COOKPAD</li>
                    {is_adminpage && <li id="first-item"><Link to="/">Logout</Link></li>}
                </ul>
            </div>
        )
    }
}