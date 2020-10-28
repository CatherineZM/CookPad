import React, { Component } from 'react';
import './style.css'
import Navbar from "../Navbar/navbar.component"

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid: this.props.match.params.uid,
            description: "Hello World!"
        }
    }

    componentDidMount() {
        // get description from the database
    }

    onChangeDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        // update the description in database
        window.location = "/myprofile/" + this.state.uid;
    }

    render(){
        return(
            <div className="container">
                <Navbar uid={this.state.uid}/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" placeholder="Tell me about yourself" className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>  
        );
    }
} 