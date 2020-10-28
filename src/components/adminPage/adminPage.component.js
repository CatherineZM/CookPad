import React, { Component } from 'react';
import UserList from "./userlist/userList.component"
import './style.css'
import NavbarEmpty from '../Navbar-empty/navbar-empty'

export default class AdminPage extends Component {
    constructor(props){
        super(props);

        this.state = { users: 
            [{username: "user", password: "user"}, {username: "admin", password:"admin"}]}
    }

    componentDidMount() {
        // we will update this.state.users by pulling from database
    }


    render(){
        return(
            <div className="container-sm">    
                <NavbarEmpty is_adminpage={true}/>
                <UserList users={this.state.users}/>     
            </div>  
        )
    }
} 