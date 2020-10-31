import React, { Component } from 'react';
import Container from "@material-ui/core/Container"
import Navbar from '../Navbar/navbar.component'
import ReceipeList from '../recipelist/recipelist.component'
import './style.css'

// hardcoded images
import recipe1 from '../../recipes/butter-chicken.jpg'
import recipe2 from '../../recipes/lemon-zucchini-bread.jpg'
import recipe3 from '../../recipes/ramen.jpg'
import recipe4 from '../../recipes/vanilla-cake.png'

export default class MyCollection extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid: this.props.match.params.uid,
            recipes: [
                {id:0, src:recipe1, liked: false, collected: false, title:'Butter Chicken', likes: 123, categories:[7]},
                {id:1, src:recipe2, liked: false, collected: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
                {id:2, src:recipe3, liked: false, collected: false, title:'Ramen', likes:98, categories:[1]},
                {id:3, src:recipe4, liked: false, collected: false, title:'vanilla cake', likes:76, categories:[0]}
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
    }

    render(){
        return(
            <div>
            <Navbar uid={this.state.uid}/>
            <Container maxWidth='md'>
                <div id="my-collection">
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