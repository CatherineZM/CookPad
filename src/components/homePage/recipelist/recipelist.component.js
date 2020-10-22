import React, { Component } from 'react';
import "./style.css"

export default class ReceipeList extends Component {
    render(){
        const {recipes} = this.props;
        return(
            <div>
            {recipes.map( (recipe) => (
                <div className="recipe-container">
                    <img className="recipe" src={recipe.src} alt={recipe.text} height="200px" width="275px"/>
                    <div className="text-bottom-left">{recipe.title}</div>
                </div>
            ))}
            </div>
        )   
    }
}