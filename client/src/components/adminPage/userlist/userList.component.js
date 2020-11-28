import React, { Component } from 'react';
import { uid } from "react-uid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import "./userlist.css"

const styles = {
    head:{
        fontSize: '16pt',
        fontWeight: 400,
    },
  };

class UserList extends Component {
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

    onBan(e, uid){
        e.preventDefault();
        if (window.confirm('Are you sure you wish to ban this user?')){
            // requires server call to change the banned field of the user
        } 
    }

    onPromote(e, uid){
        e.preventDefault();
        if (window.confirm('Are you sure you wish to promote this user?')){
            // requires server call to change the isAdmin field of the user
        } 
        
    }


    render() {
        const {classes} = this.props;
        return(
            <div className="user-list">
            <Table>
                <TableHead id="table-head">
                    <TableRow>
                        <TableCell className={classes.head} align = 'center'>uid</TableCell>
                        <TableCell className={classes.head} align = 'center'>Username</TableCell>
                        <TableCell className={classes.head} align = 'center'>View Profiles</TableCell>
                        <TableCell className={classes.head} align = 'center'>Mange</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {this.state.users.map(user => (
                        <TableRow className="user_row" key={uid(user.username)}>
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
                                <button id = "banButton" className="btn btn-primary" onClick={(e)=>this.onBan(e, user.uid)}> Ban </button>
                                <button id = "promoteButton" className="btn btn-primary" onClick={(e)=>this.onPromote(e, user.uid)}> Promote </button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
            </Table>
            </div>
        )
    }
}

export default withStyles(styles)(UserList);