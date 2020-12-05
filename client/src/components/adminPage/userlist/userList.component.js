import React, { Component } from 'react';
import { uid } from "react-uid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import "./userlist.css"
import App from '../../../App';
import {deleteUser, promoteUser, getAllUser} from '../../../actions/user'

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
            users : []
        }
        getAllUser(this)
    }

    onViewProfile=(e,uid)=>{
        e.preventDefault();
        this.props.history.push(`/viewprofile/${uid}`)
    }

    onDelete(e, uid){
        e.preventDefault();
        if (window.confirm('Please confirm to delete this user?')){
            // requires server call to change the banned field of the user
            const newUsers = this.state.users.filter(user=>user._id !== uid)
            deleteUser(uid)
            this.setState({users: newUsers})
        } 
    }

    onPromote(e, uid){
        e.preventDefault();
        if (window.confirm('Please confirm to promote this user?')){
            // requires server call to change the isAdmin field of the user
            const newUsers = this.state.users
            promoteUser(uid)
            for (let user of newUsers){
                if (user._id === uid){
                    user.isAdmin = true
                    break
                }
            }
            this.setState({users: newUsers})
        } 
    
        
    }


    render() {
        const {classes, app} = this.props;
        return(
            <div className="user-list">
            <Table>
                <TableHead id="table-head">
                    <TableRow>
                        <TableCell className={classes.head} align = 'center'>Level</TableCell>
                        <TableCell className={classes.head} align = 'center'>Username</TableCell>
                        <TableCell className={classes.head} align = 'center'>View Profiles</TableCell>
                        <TableCell className={classes.head} align = 'center'>Operations</TableCell>
                    </TableRow>
                </TableHead>
                    <TableBody>
                        {console.log(this.state.users)}
                        {this.state.users.map(user => (
                        <TableRow className="user_row" key={uid(user.username)}>
                            <TableCell className = "level" align = 'center'>
                                {user.isAdmin ? "Admin":"Standard"}
                            </TableCell>
                            <TableCell className = "username" align = 'center'>
                                {user.username}
                            </TableCell>
                            <TableCell className = "Profile" align = 'center'>
                                <button id="view-profile" className="btn btn-outline-primary" onClick={(e)=>this.onViewProfile(e,user._id)}>View Profile</button>  
                            </TableCell>
                            <TableCell className = "Operations" align = 'center'>
                                <button id = "deleteButton" className="btn btn-primary" onClick={(e)=>this.onDelete(e, user._id)}> Delete </button>
                                <button id = "promoteButton" className="btn btn-primary" onClick={(e)=>this.onPromote(e, user._id)}> Promote </button>
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