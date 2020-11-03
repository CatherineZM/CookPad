import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./recipelist.css";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { uid } from "react-uid";

export default class ReceipeList extends Component {
    render(){
        const {recipes, clickHeart, clickStar, userid} = this.props;
        return(
            <div>
            {recipes.map( (recipe) => (
                <div key={uid(recipe.title)} className="recipe-container">
                    <Link to={"/viewrecipe/"+ userid + "/" + recipe.id}>
                    <img className="recipe" src={recipe.src} alt={recipe.text} height="190px" width="190px"/>
                    </Link> 
                    <div className="recipe-title">{recipe.title}</div>
                    <div className="like-class">
                         
                        {recipe.liked && <FaHeart className="likes" onClick={()=>clickHeart(recipe.id)}/>}
                        {!recipe.liked && <FaHeart className="dislikes" onClick={()=>clickHeart(recipe.id)}/>}
                        <span>{recipe.likes}</span>
                        {recipe.collected && <FaBookmark className="star" onClick={()=>clickStar(recipe.id)}/>}  
                        {!recipe.collected && <FaBookmark className="hollow-star" onClick={()=>clickStar(recipe.id)}/>} 
                    </div>
                </div>   
            ))}
            </div>
        )   
    }
}