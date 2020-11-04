import React, { Component } from 'react';
import { uid } from "react-uid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import {Link} from 'react-router-dom';
import "./userlist.css"

export default class UserList extends Component {
    constructor(props){
        super(props);
        this.state= {
            uid : this.props.uid,
            users : this.props.users
        }
    }

    onViewProfile=(e,uid)=>{
        e.preventDefault();
        window.location = "/viewprofile/"+uid+"/"+this.state.uid; 
    }
    render() {
        return(
            <div className="user-list">
            <Table>
                <TableHead className="table-head">
                    <TableRow>
                        <TableCell align = 'center'>uid</TableCell>
                        <TableCell align = 'center'>Username</TableCell>
                        <TableCell align = 'center'>View Profiles</TableCell>
                        <TableCell align = 'center'>Mange</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {this.state.users.map(user => (
                        <TableRow class="user_row" key={uid(user.username)}>
                            <TableCell className = "uid" align = 'center'>
                                {user.uid}
                            </TableCell>
                            <TableCell className = "username" align = 'center'>
                                {user.username}
                            </TableCell>
                            <TableCell className = "Profile" align = 'center'>
                                <button id="view-profile" className="btn btn-outline-primary" onClick={(e)=>this.onViewProfile(e,user.uid)}>View Profile</button>  
                            </TableCell>
                            <TableCell className = "Operations" align = 'center'>
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
