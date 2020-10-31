import React, { Component } from 'react';
import Container from '@material-ui/core/Container'
import './style.css'
import Navbar from "../Navbar/navbar.component"
import ReceipeList from '../recipelist/recipelist.component'

import recipe10 from '../../recipes/seafood-stew.png'
import recipe11 from '../../recipes/Chicken-Noodle-Soup.jpg'

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            // the following information is fetched from database according to curruid
            username: "raon", 
            description: "I love Chinese Food!!!",
            recipes: [
                {id:9, src:recipe10, liked: false, collected: false, title:'Spicy seafood stew', likes:50, categories:[6, 7]},
                {id:10, src:recipe11, liked: false, collected: false, title:'Chicken Noodle Soup', likes:47, categories:[7]}
            ]
        }
    }

    componentDidMount() {
        // fetch user information and other recipes user created
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

    editprofile=(e)=>{
        e.preventDefault();
        window.location = "/myprofile/" + this.state.uid;
    }

    render(){
        return(
            <div>
            <Navbar uid={this.state.uid}/>
            <Container maxWidth='md'>
                
                <div id="user-profile">
                    <h4>{this.state.username + "'s Profile:"}</h4>
                </div>
                <form onSubmit={this.editprofile}>
                    <div className="form-group">
                        <input type="text" placeholder="Tell me about yourself" className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>  
                    <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary"/>
                    </div>
                </form>
                <div id="user-recipes">
                    <h4>{this.state.username + "'s Recipes:"}</h4>
                    <ReceipeList 
                        recipes={this.state.recipes}
                        clickHeart={this.clickHeart}
                        clickStar={this.clickStar}
                        userid={this.state.uid}
                    />    
                </div>
            </Container> 
            </div>
        )
    }
} 