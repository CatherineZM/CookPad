import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';
import './style.css'
import cookpadIcon from '../homePage/images/cookpad.png'

const user_lst = [
    {uid: 0, username: "nora", description: "I love Chinese Food!!!", isAdmin: true},
    {uid: 1, username: "mo", description: "I love my boyfriend!!!", isAdmin: false}
    ]

export default class Navbar extends Component {

    constructor(props){
        super(props);
        this.state = {
            uid: this.props.uid,
            isAdmin: user_lst.find(usr => usr.uid == this.props.uid).isAdmin
        }

    }
        
    

    adminPageGenerator = ()=>{
        if (this.state.isAdmin){
            return <li><Link to={"/adminpage/"+this.state.uid}>Admin Page</Link></li>;
        }
        return null;
    }


    render(){

        return(
            <AppBar position="static">   
            <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
          ></IconButton>
          <SearchIcon />
            <div id="navbar">
                <div className="logo">
                    <img src={cookpadIcon} alt="cookpad"/>
                    <Link to={"/homepage/"+this.state.uid}>COOKPAD</Link>
                </div>
                
                <ul>
                    <li><Link to={"/addrecipe/"+this.state.uid}>Create a Recipe</Link></li>
                    <li><Link to={"/mycollection/"+this.state.uid}>My Collection</Link></li>
                    <li><Link to={"/viewprofile/"+this.state.uid+"/"+ this.state.uid}>My Profile</Link></li>
                    <this.adminPageGenerator/>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </div>
            </AppBar>
        )
    }
}