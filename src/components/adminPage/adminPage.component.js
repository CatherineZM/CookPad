import React, { Component } from 'react';
import User from "./user.component"
import { uid } from "react-uid";
import './style.css'
import {Link} from 'react-router-dom'
import cookpadIcon from '../homePage/images/cookpad.png'

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
            <div id="navbar">
                <ul>
                    <li><img src={cookpadIcon} alt="cookpad" width="50px" height="50px"/><Link to="/homepage/1">COOKPAD</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </div>   
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