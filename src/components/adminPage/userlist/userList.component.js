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
                            <TableCell>Uid</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>View Profiles</TableCell>
                            <TableCell>Mange</TableCell>
                        </TableRow>
                        {this.state.users.map(user => (
                        <TableRow class="user_row" key={uid(user.username)}>
                            <TableCell className = "uid">
                                {user.uid}
                            </TableCell>
                            <TableCell className = "username">
                                {user.username}
                            </TableCell>
                            <TableCell className = "Profile">
                                <Link to={"/viewprofile/"+user.uid+"/"+this.state.uid}>View Profile</Link>
                            </TableCell>
                            <TableCell className = "Operations">
                                <button id = "banButton" className="btn btn-primary" onClick={()=>{}}> Ban </button>
                                <button id = "promoteButton" className="btn btn-primary" onClick={()=>{}}> Promote </button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
            </Table>
            </div>
        )
    }
}
