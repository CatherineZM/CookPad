import React, { Component } from 'react';
    import { matchPath } from "react-router-dom";

export default class MyRecipes extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: this.props.uid
        }

    }

    componentDidMount() {
    }


    render(){
        return(
            <div className="container">
                <p> This is the user {this.props.uid} recipes page</p>
            </div>  
        )
    }
} 