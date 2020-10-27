import React, { Component } from 'react';
import Navbar from '../Navbar/navbar.component'
import recipe9 from '../recipes/seafood-sandwiches.png'
import ReceipeList from '../recipelist/recipelist.component'

export default class MyCollection extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.uid,
            recipes: [
                {id:8, src:recipe9, liked: false, collected: false,  title:'Seafood Sandwiches', likes:58, categories:[5, 6]}
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
    }

    render(){
        return(
            <div className="container-sm">
                <Navbar/>
                <ReceipeList 
                    recipes={this.state.recipes}
                    clickHeart={this.clickHeart}
                    clickStar={this.clickStar}
                />
            </div>  
        )
    }
} 