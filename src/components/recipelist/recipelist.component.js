import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./style.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { uid } from "react-uid";

export default class ReceipeList extends Component {
    render(){
        const {recipes, clickHeart, clickStar, userid} = this.props;
        return(
            <div>
            {recipes.map( (recipe) => (
                <div key={uid(recipe.title)} className="recipe-container">
                    <Link to={"/viewrecipe/"+ userid + "/" + recipe.id}>
                    <img className="recipe" src={recipe.src} alt={recipe.text} height="200px" width="275px"/>
                    </Link> 
                    <div className="recipe-title">{recipe.title}</div>
                    <div className="like-class">
                        {recipe.collected && <FaStar className="star" onClick={()=>clickStar(recipe.id)}/>}  
                        {!recipe.collected && <FaStar className="hollow-star" onClick={()=>clickStar(recipe.id)}/>}  
                        {recipe.liked && <FaHeart className="likes" onClick={()=>clickHeart(recipe.id)}/>}
                        {!recipe.liked && <FaHeart className="dislikes" onClick={()=>clickHeart(recipe.id)}/>}
                        {recipe.likes}
                    </div>
                </div>    
            ))}
            </div>
        )   
    }
}