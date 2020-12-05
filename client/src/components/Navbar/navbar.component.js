import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {logout} from "../../actions/user";
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';
import './navbar.css'
import cookpadIcon from '../homePage/images/cookpad.png'

export default class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            uid: this.props.uid,
        }
    }

    render(){
        const { app } = this.props;
        return(
            <AppBar position="static" color="transparent" className="nav-bar">   
            <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          ></IconButton>
          <SearchIcon />
            <div id="navbar">
                <div className="logo">
                    <img src={cookpadIcon} alt="cookpad"/>
                    <Link to={"/homepage/"}>COOKPAD</Link>
                </div>
                
                <ul>
                    <li><Link to={"/homepage"}>Home Page</Link></li>
                    <li><Link to={"/addrecipe"}>Create a Recipe</Link></li>
                    {!app.state.currentUser.isAdmin && <li><Link to={"/viewprofile/"+ app.state.currentUser._id}>My Profile</Link></li>}
                    {app.state.currentUser.isAdmin && <li><Link to={"/adminpage"}>Admin Page</Link></li>}
                    <li><Link to="/" onClick={()=>logout(app)}>Logout</Link></li>
                </ul>
            </div>
            </AppBar>
        )
    }
}