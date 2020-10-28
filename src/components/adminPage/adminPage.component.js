import React, { Component } from 'react';
import User from "./user.component"
import { uid } from "react-uid";
import './style.css'
import NavbarEmpty from '../Navbar-empty/navbar-empty'

export default class AdminPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            users: this.props.appState.users   
        }
    }

    componentDidMount() {
    }


    render(){
        return(
            <div className="container-sm">    
                <NavbarEmpty is_adminpage={true}/>

                <table className="user-list">
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Ban a user</th>
                            <th>Promote a user</th>
                        </tr>
                        {this.state.users.map(user => (
                        <User key={uid(user)} /* unique id required to help React render more efficiently when we modify the students list. */
                                    user={user}
                        />
                        ))}
                    </tbody>
                </table>
            </div>  
        )
    }
} 