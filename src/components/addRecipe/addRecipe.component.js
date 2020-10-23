import React, { Component } from 'react';
import './addRecipe-style.css'

const log = console.log; 

class NewRecipe {
    cosntructor(RecipeName, Ingredients, Steps) {
        this.RecipeName = RecipeName;
        this.Ingredients = Ingredients; 
        this.Steps = Steps; 
        //optional content
        this.Description = null;
    }
}

export default class AddRecipe extends Component {
    constructor(props){
        super();
        this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.onChangeSteps = this.onChangeSteps.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            RecipeName: '',
            Description: '',
            Steps:'',
            Recipes: [],
            Counts: 0
        }
    }

    onChangeRecipeName(e){
        e.preventDefault();
        this.setState({ RecipeName: e.target.value });
    }

    onChangeDescription(e){
        e.preventDefault();
        this.setState({ Description: e.target.value });
    }

    onChangeIngredients(e){
        e.preventDefault();
        this.setState({ Ingredients: e.target.value });
    }

    onChangeSteps(e){
        e.preventDefault();
        this.setState({ Steps: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        this.createRecipe();
        log(`${this.recipe.Recipes[0].RecipeName}`);
        //window.location = "./../homepage/:uid";
    }

    render(){
        return(
            <div className="container">
                <form onSubmit = {this.onSubmit}>
                {/* <div className = "Recipe-form">
                        <label> Recipe Picture: </label>
                        <input type = "Picture" className = "form-control" value = {this.state.Picture} onChange={this.onChangeRecipePicture}/>
                    </div> */}
                    <div className = "Recipe-form">
                        <label> Recipe Name: </label>
                        <input type = "Name" className = "form-control" value = {this.state.RecipeName} onChange={this.onChangeRecipeName}/>
                    </div>
                    <div className = "Recipe-form">
                        <label> Recipe Description: </label>
                        <input type = "Description" required placeholder="optional" className = "form-control" value = {this.state.Description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className = "Ingredient-form" >
                        <label> Recipe Ingredients: </label>
                        <input type = "Ingredients" className = "form-control" value = {this.state.Ingredients} onChange={this.onChangeIngredients}/>
                    </div>
                    <div className = "Recipe-form">
                        <label> Recipe Steps: </label>
                        <input type = "Steps" className = "form-control" value = {this.state.Steps} onChange={this.onChangeSteps}/>
                    </div>
                    <div className = "Recipe-form">
                        <input type = "Submit" value = "Submit New Recipe" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
            
        )
    }

    createRecipe(){
        const Recipe = new NewRecipe(this.state.RecipeName);
        this.state.Recipes.push(Recipe);
        this.setState({RecipeCounts: this.state.RecipeCounts+1});
    }
    
} 
