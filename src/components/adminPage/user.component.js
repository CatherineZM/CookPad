import React, { Component } from 'react';

export default class User extends Component {
    constructor(props){
        super(props);

        this.state = {
            username : this.props.user.username,
            uid : this.props.user.id
        }
    }

    render() {
        return(
            <tr class="user_row" key={this.state.username}>
                <td className = "username">
                    {this.state.username}
                </td>
                <td className = "banButton">
                    <button onClick={()=>{}}> Ban </button>
                </td>
                <td className = "PromoteButton">
                    <button onClick={()=>{}}> Promote </button>
                </td>
            </tr>
        )
    }
}
