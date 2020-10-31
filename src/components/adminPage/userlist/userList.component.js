import React, { Component } from 'react';
import { uid } from "react-uid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import "./style.css"

export default class UserList extends Component {
    render() {
        const {users} = this.props;
        return(
            <div className="user-list">
            <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Ban a user</TableCell>
                            <TableCell>Promote a user</TableCell>
                        </TableRow>
                        {users.map(user => (
                        <TableRow class="user_row" key={uid(user.username)}>
                            <TableCell className = "username">
                                {user.username}
                            </TableCell>
                            <TableCell className = "banButton">
                                <button className="btn btn-primary" onClick={()=>{}}> Ban </button>
                            </TableCell>
                            <TableCell className = "PromoteButton">
                                <button className="btn btn-primary" onClick={()=>{}}> Promote </button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
            </Table>
            </div>
        )
    }
}
