import React, { Component } from 'react';
import UserList from "./userlist/userList.component"
import Navbar from '../Navbar/navbar.component'
import {Container} from "@material-ui/core"

export default class AdminPage extends Component {
    constructor(props){
        super(props);

        this.state = { 
            users: [],
            uid: this.props.match.params.uid
        }
    }


    render(){
        const { history, app } = this.props;
        return(
            <div>
                <Container maxWidth='lg'>     
                <Navbar app={app}/>
                    <UserList app={app} history={history}/> 
                    {console.log(this.state.users)}  
                </Container>
            </div>  
        )
    }
} 