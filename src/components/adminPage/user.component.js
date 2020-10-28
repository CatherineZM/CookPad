import React, { Component } from 'react';
import { uid } from "react-uid";

export default class Users extends Component {
    render() {
        const {users} = this.props;
        return(
            <table className="user-list">
                    <tbody>
                        <tr>
                            <th>Username</th>
                            <th>Ban a user</th>
                            <th>Promote a user</th>
                        </tr>
                        {users.map(user => (
                        <tr class="user_row" key={uid(user.username)}>
                            <td className = "username">
                                {user.username}
                            </td>
                            <td className = "banButton">
                                <button onClick={()=>{}}> Ban </button>
                            </td>
                            <td className = "PromoteButton">
                                <button onClick={()=>{}}> Promote </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
            </table>
            
        )
    }
}
