import React, { Component } from 'react';
import Container from "@material-ui/core/Container"
import Navbar from '../Navbar/navbar.component'
import ReceipeList from '../recipelist/recipelist.component'
import './myCollection.css'

// hardcoded images
import recipe1 from '../../recipes/butter-chicken.jpg'
import recipe2 from '../../recipes/lemon-zucchini-bread.jpg'
import recipe3 from '../../recipes/ramen.jpg'
import recipe4 from '../../recipes/vanilla-cake.png'
import recipe5 from '../../recipes/spaghetti.png'
import recipe6 from '../../recipes/apple-pie.png'
import recipe7 from '../../recipes/homemade-pizza.png'
import recipe8 from '../../recipes/greek-salad.png'

export default class MyCollection extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid: this.props.match.params.uid,
            recipes: [
                {id:0, src:recipe1, liked: false, collected: false, title:'Butter Chicken', likes: 123, categories:[7]},
                {id:1, src:recipe2, liked: false, collected: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
                {id:2, src:recipe3, liked: false, collected: false, title:'Ramen', likes:98, categories:[1]},
                {id:3, src:recipe4, liked: false, collected: false, title:'Vanilla Cake', likes:76, categories:[0]},
                {id:4, src:recipe5, liked: false, collected: false, title:'Homemade Spaghetti', likes:65, categories:[1]},
                {id:5, src:recipe6, liked: false, collected: false, title:'Apple Pie', likes:63, categories:[2]},
                {id:6, src:recipe7, liked: false, collected: false, title:'Homemade Pizza', likes:62, categories:[3]},
                {id:7, src:recipe8, liked: false, collected: false, title:'Greek Salad', likes:60, categories:[4]}
            ]
        }
    }

    componentDidMount() {
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
                    new_recipes[idx].likes++;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
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
    }

    clickRecipe=(userid,rid)=>{
        window.location = "/viewrecipe/"+ userid + "/" + rid;
    }

    render(){
        return(
            <div>
            
            <Container maxWidth='md'>
                <Navbar uid={this.state.uid}/>
                <div id="my-collection">
                <b>My Collection</b>
                <ReceipeList 
                    recipes={this.state.recipes}
                    clickHeart={this.clickHeart}
                    clickStar={this.clickStar}
                    clickRecipe={this.clickRecipe}
                    userid={this.state.uid}
                />
                </div>
            </Container>  
            </div>
        )
    }
}