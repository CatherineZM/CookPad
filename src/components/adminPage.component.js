import React, { Component } from 'react';
import Navbar from './Navbar/navbar.component';
import User from "./user.component"
import { uid } from "react-uid";

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
            <div className="container">
                <Navbar/>
           
                <table className="user-list">
                    <tbody>
                        <tr>
                            <th>Username</th>
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