import React, { Component } from 'react';
import './style.css'
import Navbar from "../Navbar/navbar.component"
import ReceipeList from '../recipelist/recipelist.component'

// hardcoded images
import recipe5 from '../../recipes/spaghetti.png'
import recipe6 from '../../recipes/apple-pie.png'

export default class ViewProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            curruid: this.props.match.params.curruid,
            // the following information is fetched from database according to curruid
            user: {username: "raon", description: "I love Chinese Food!!!"},
            recipes: [
                {id:4, src:recipe5, liked: false, collected: false, title:'Homemade Spaghetti', likes:65, categories:[1]},
                {id:5, src:recipe6, liked: false, collected: false, title:'Apple Pie', likes:63, categories:[2]}
            ]
        }
    }

    clickHeart=(rid)=>{
        // need to update the information into database
        let new_recipes = this.state.recipes;
        this.state.recipes.forEach((recipe, idx)=>{
            if(recipe.id === rid){
                if(recipe.liked){
                    new_recipes[idx].liked = false;
                    new_recipes[idx].likes--;
                    this.setState({ recipes: new_recipes });
                }else{
                    new_recipes[idx].liked = true;
                    new_recipes[idx].likes--;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
        console.log(this.state.recipes)
    }

    clickStar=(rid)=>{
        // need to update the information into database
        let new_recipes = this.state.recipes;
        this.state.recipes.forEach((recipe, idx)=>{
            if(recipe.id === rid){
                if(recipe.collected){
                    new_recipes[idx].collected = false;
                    this.setState({ recipes: new_recipes });
                }else{
                    new_recipes[idx].collected = true;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
        console.log(this.state.recipes)
    }


    render(){
        return(
            <div className="container-sm">
                <Navbar uid={this.state.uid}/>
                <div id="user-profile">
                    <h4>{this.state.user.username + "'s Profile:"}</h4>
                    <div>{this.state.user.description}</div>
                </div>
                <div id="user-recipes">
                    <h4>{this.state.user.username + "'s Recipes:"}</h4>
                    <ReceipeList 
                        recipes={this.state.recipes}
                        clickHeart={this.clickHeart}
                        clickStar={this.clickStar}
                        userid={this.state.uid}
                    />    
                </div>
            </div> 
        )
    }
} 