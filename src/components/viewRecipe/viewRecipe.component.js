import React, { Component } from 'react';
import Navbar from "../Navbar/navbar.component";
import { FaHeart, FaStar } from "react-icons/fa";
import { uid } from "react-uid";
// hardcoded images
import recipe1 from '../recipes/butter-chicken.jpg'

export default class ViewRecipe extends Component {
    constructor(props){
        super(props);
        // the current recipe will be fetch from database
        // here assume you have all the recipes
        this.state = {
            uid: this.props.match.params.uid,
            rid: this.props.match.params.rid,
            recipe: {id:0, src:recipe1, liked: false, title:'Butter Chicken', likes: 123, categories:[7], collected: false,
            creator:"Nora", 
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
        console.log(this.state.uid)
        console.log(this.state.rid)
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
        window.location = "/editRecipe/" + this.state.recipe.id
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
            <div className="container-sm">
                <Navbar uid={this.state.uid}/>
                <p>{this.state.recipe.title}</p>
                <p>By: {this.state.recipe.creator}</p>
                <div>
                    {this.state.recipe.collected && <FaStar className="star" onClick={()=>this.clickStar(this.state.recipe.id)}/>}  
                    {!this.state.recipe.collected && <FaStar className="hollow-star" onClick={()=>this.clickStar(this.state.recipe.id)}/>}  
                    {this.state.recipe.liked && <FaHeart className="likes" onClick={()=>this.clickHeart(this.state.recipe.id)}/>}
                    {!this.state.recipe.liked && <FaHeart className="dislikes" onClick={()=>this.clickHeart(this.state.recipe.id)}/>}
                    {this.state.recipe.likes}
                </div>

                <p>ingredients:</p>
                <table>
                    <tbody>
                    {this.state.recipe.ingredients.map((ingredient)=>{
                    return(
                        <tr key={uid(ingredient.ingredient)}>
                            <td>{ingredient.ingredient}:</td>
                            <td>{ingredient.measure}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
                
                <p>steps:</p>
                <table>
                    <tbody>
                        {this.state.recipe.steps.map((step, id)=>{
                            return(
                                <tr key={uid(step)}>
                                    <td>{id+1}.{step}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <form onSubmit={this.editRecipe}><input type="submit" value="Edit" className="btn btn-primary"/></form>
                <form onSubmit={this.deleteRecipe}><input type="submit" value="Delete" className="btn btn-primary"/></form>
            </div>  
        )
    }
} 