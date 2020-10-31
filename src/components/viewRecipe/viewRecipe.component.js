import React, { Component } from 'react';
import Navbar from "../Navbar/navbar.component";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"
import Container from "@material-ui/core/Container"
import Ingredients from "./ingredients.component"
import Steps from "./steps.component"
import {uid} from "react-uid"

// hardcoded images
import recipe1 from '../../recipes/butter-chicken.jpg'
import recipe2 from '../../recipes/lemon-zucchini-bread.jpg'
import recipe3 from '../../recipes/ramen.jpg'

export default class ViewRecipe extends Component {
    constructor(props){
        super(props);
        // the current recipe will be fetch from database
        this.state = {
            uid: this.props.match.params.uid,
            rid: this.props.match.params.rid,
            top3_recipe:[
                {id:1, src:recipe2, liked: false, collected: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
                {id:2, src:recipe3, liked: false, collected: false, title:'Ramen', likes:98, categories:[1]}
            ],
            recipe: {id:0, src:recipe1, liked: false, title:'Butter Chicken', likes: 123, categories:[7], collected: false,
            creator:{uid:127, username:"Raon"}, 
            ingredients: [
                {ingredient:"Butter", measure:"2 tablespoons"},
                {ingredient:"Medium onion", measure:"1 (medium diced)"},
                {ingredient:"Red pepper", measure:"1 (small dice)"},
                {ingredient:"Garlic cloves", measure:"3 (minced)"},
                {ingredient:"Grated ginger", measure:"1 tablespoon"},
                {ingredient:"Garam masala", measure:"1 teaspoon"},
                {ingredient:"Cumin", measure:"1 teaspoon"},
                {ingredient:"Red chili powder", measure:"1 teaspoon"},
                {ingredient:"Diced tomatoes", measure:"14 ounces"},
                {ingredient:"Heavy cream", measure:"1 cup"},
                {ingredient:"Salt and pepper", measure:"To taste"}
            ], 
            steps: [
                "Heat a large pan to medium high heat and add the olive oil. Add the chicken and cook for 5 minutes, stirring, until the chicken is browned. Remove the chicken and set it aside.", 
                "Melt the butter in the same pan. Add the onion and peppers and cook them 5 minutes to soften.",
                "Add the garlic and ginger and cook 1 minute, until they become fragrant.",
                "Add the garam masala, cumin, red chili powder, salt and pepper. Stir and cook for 1 minute.",
                "Stir in the diced tomatoes. Bring to a quick boil, then reduce the heat and simmer for 15 minutes to break everything down.",
                "Transfer the sauce to a blender or food processor and process until smooth. You can thin it out with a bit of water if you’d like.",
                "Strain the sauce back into the pan. The point is to make the sauce very smooth and heat through.",
                "Stir in the cream and add the chicken back to the pan. Heat and simmer for 10 minutes, or until the chicken is cooked through and the sauce thickens up a bit.",
                "Serve with cooked white rice and enjoy!"
            ]
        }
        }
    }

    componentDidMount() {
        // the current recipe will be fetch from database
    }

    clickStar=(rid)=>{
        // need to update the information into database
        let new_recipe = this.state.recipe;
        if(this.state.recipe.collected){
            new_recipe.collected = false;
            this.setState({ recipes: new_recipe });
        }else{
            new_recipe.collected = true;
            this.setState({ recipes: new_recipe });
        }
    }

    clickHeart=(rid)=>{
        // need to update the information into database
        let new_recipe = this.state.recipe;
        if(this.state.recipe.liked){
            new_recipe.liked = false;
            new_recipe.likes--;
            this.setState({ recipes: new_recipe });
        }else{
            new_recipe.liked = true;
            new_recipe.likes++;
            this.setState({ recipes: new_recipe });
        }
    }

    editRecipe=(e)=>{
        e.preventDefault();
        window.location = "/editRecipe/" + this.state.uid + "/" + this.state.recipe.id
    }

    deleteRecipe=(e)=>{
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this item?')){
            // delete item in database
            console.log("item deleted")
            window.location = "/myrecipes/" + this.state.uid
        } 
    }

    render(){
        return(
            <div>
            <Navbar uid={this.state.uid}/>
            <Container maxWidth="md">
                <div className="recipe-des">
                    <img src={this.state.recipe.src} alt="" width="600px" height="400px"/>
                    <div className="recipe-des-text">
                        {this.state.recipe.title+" "}
                        {this.state.recipe.collected && <FaStar className="star" onClick={()=>this.clickStar(this.state.recipe.id)}/>}  
                        {!this.state.recipe.collected && <FaStar className="hollow-star" onClick={()=>this.clickStar(this.state.recipe.id)}/>}  
                        {this.state.recipe.liked && <FaHeart className="likes" onClick={()=>this.clickHeart(this.state.recipe.id)}/>}
                        {!this.state.recipe.liked && <FaHeart className="dislikes" onClick={()=>this.clickHeart(this.state.recipe.id)}/>}
                        {this.state.recipe.likes}
                        <p><Link to={"/viewprofile/"+ this.state.uid + "/" + this.state.recipe.creator.uid}>By: {this.state.recipe.creator.username}</Link></p>
                    </div>
                </div>

                <div className="recommendations">
                {this.state.top3_recipe.map((recipe)=>(
                    <div key={uid(recipe.title)}>
                        <Link to={"/viewrecipe/"+ this.state.uid + "/" + recipe.id}>
                        <img src={recipe.src} alt="" height="200px" width="260px"></img>
                        </Link>
                    <div>{recipe.title}</div>
                    </div>
                    ))}
                </div>
                

                <div className="mid-section">
                    <Steps
                        steps={this.state.recipe.steps}
                    />

                    <Ingredients
                        ingredients={this.state.recipe.ingredients}
                    />
                </div>

                {/* only show the two button if they belong to the user */}
                <div>
                    <div className="view-recipe-form-group">
                        <form float="left" onSubmit={this.editRecipe}><input type="submit" value="Edit" className="btn btn-primary"/></form>
                    </div>
                    <div className="view-recipe-form-group">
                        <form onSubmit={this.deleteRecipe}><input type="submit" value="Delete" className="btn btn-primary"/></form>
                    </div>
                </div>
            </Container> 
            </div> 
        )
    }
} 