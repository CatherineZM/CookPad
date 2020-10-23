import React, { Component } from 'react';
import {Link} from "react-router-dom";
import "./style.css";
import { FaHeart } from "react-icons/fa";
import { uid } from "react-uid";
import Navbar from "../Navbar/navbar.component"

import recipe1 from '../recipes/butter-chicken.jpg'
import recipe2 from '../recipes/lemon-zucchini-bread.jpg'
import recipe3 from '../recipes/ramen.jpg'
import recipe4 from '../recipes/vanilla-cake.png'

export default class MyRecipes extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: this.props.uid,
            recipes: [
                {id:0, src:recipe1, liked: false, title:'Butter Chicken', likes: 123, categories:[7]},
                {id:1, src:recipe2, liked: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
                {id:2, src:recipe3, liked: false, title:'Ramen', likes:98, categories:[1]},
                {id:3, src:recipe4, liked: false, title:'vanilla cake', likes:76, categories:[0]}
            ]
        }

    }

    componentDidMount() {
    }

    clickHeart=(rid)=>{
        // need to update the information into database
        let new_recipes = this.state.recipes;
        if(this.state.recipes[rid].liked){
            new_recipes[rid].liked = false;
            new_recipes[rid].likes--;
            this.setState({ recipes: new_recipes });
        }else{
            new_recipes[rid].liked = true;
            new_recipes[rid].likes++;
            this.setState({ recipes: new_recipes });
        }
    }

    render(){
        return(
            <div className="container-sm">
                <Navbar />
                <div>
                {this.state.recipes.map( (recipe) => (
                    <div key={uid(recipe.title)} className="recipe-container">
                    <Link to={"/viewrecipe/"+ recipe.id}>
                    <img className="recipe" src={recipe.src} alt={recipe.text} height="200px" width="275px"/>
                    </Link> 
                    <div className="recipe-title">{recipe.title}</div>
                    <div>
                        {recipe.liked && <FaHeart className="likes" onClick={()=>this.clickHeart(recipe.id)}/>}
                        {!recipe.liked && <FaHeart className="dislikes" onClick={()=>this.clickHeart(recipe.id)}/>}
                        {recipe.likes}
                    </div>
                </div>    
            ))}
            </div>
            </div>  
        )
    }
} 