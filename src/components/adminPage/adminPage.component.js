import React, { Component } from 'react';
import UserList from "./userlist/userList.component"
import './style.css'
import Navbar from '../Navbar/navbar.component'
import Container from "@material-ui/core/Container"

const user_lst = [
    {uid: 0, username: "admin", name: "Nora", description: "I love Chinese Food!!!", isAdmin: true},
    {uid: 1, username: "user", name: "Mo", description: "I love my boyfriend!!!", isAdmin: false}
    ]

export default class AdminPage extends Component {
    constructor(props){
        super(props);

        this.state = { 
            users: user_lst,
            uid: this.props.match.params.uid
        }
    }

    componentDidMount() {
        // we will update this.state.users by pulling from database
    }


    render(){
        return(
            <div>
                <Navbar uid={this.state.uid}/>
                <Container maxWidth='md'>       
                    <UserList users={this.state.users} uid={this.state.uid}/>     
                </Container>
            </div>  
        )
    }
} 