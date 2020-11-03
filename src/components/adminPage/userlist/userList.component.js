import React, { Component } from 'react';
import { uid } from "react-uid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import {Link} from 'react-router-dom';
import "./style.css"

export default class UserList extends Component {
    constructor(props){
        super(props);
        this.state= {
            uid : this.props.uid,
            users : this.props.users
        }
    }
    render() {
        return(
            <div className="user-list">
            <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Ban a user</TableCell>
                            <TableCell>Promote a user</TableCell>
                        </TableRow>
                        {this.state.users.map(user => (
                        <TableRow class="user_row" key={uid(user.username)}>
                            <TableCell className = "username">
                                <Link to={"/viewprofile/"+user.uid+"/"+this.state.uid}>{user.username}</Link>
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
