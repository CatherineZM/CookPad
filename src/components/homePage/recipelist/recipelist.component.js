import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./style.css"

export default class ReceipeList extends Component {
    render(){
        const {recipes} = this.props;
        return(
            <div>
            {recipes.map( (recipe) => (
                <Link to={"/viewrecipe/"+ recipe.id}>
                <div className="recipe-container">
                    <img className="recipe" src={recipe.src} alt={recipe.text} height="200px" width="275px"/>
                    <div className="recipe-title">{recipe.title}</div>
                </div>
                </Link>
            ))}
            </div>
        )   
    }
}