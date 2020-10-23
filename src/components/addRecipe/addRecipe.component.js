import React, { Component } from 'react';
import './addRecipe-style.css'
import Navbar from "../Navbar/navbar.component";
//import { DrawerLayoutAndroidBase } from 'react-native';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const log = console.log; 

class NewRecipe {
    cosntructor(RecipeName, Ingredients, Steps) {
        this.RecipeName = RecipeName;
        this.Ingredients = Ingredients; 
        this.Steps = Steps; 
        //optional content
        this.Description = null;
        this.RecipeImage = null;
    }
}

const CuisineType = ['Cake', 'Noodles', 'Pie', 'Pizza', 'Salads', 'Sandwiches', 'Seafood', 'Soup'];

const defaultType = 'Select a Cuisine Type';

const UnitType = ['(quantity)','kg', 'g','mg', 'cup(s)', 'teaspoon(s)', 'tablespoon(s)', 'mL', 'L', 'oz', 'lb(s)'];

const defaultUnit = UnitType[0];

export default class AddRecipe extends Component {
    constructor(props){
        super();
        this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeIngredients = this.onChangeIngredients.bind(this);
        this.addIngredientsRow = this.addIngredientsRow.bind(this);
        this.onChangeSteps = this.onChangeSteps.bind(this);
        this.addStepsRow = this.addStepsRow(this);
        this.onImageUpload = this.onImageUpload(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            RecipeName: '',
            Description: '',
            Steps:'',
            RecipeImage: null,
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

    addIngredientsRow(e){
        
    }

    onChangeSteps(e){
        e.preventDefault();
        this.setState({ Steps: e.target.value });
    }

    addStepsRow(e){
        
    }

    onImageUpload(e){
        //this.setState({ RecipeImage: URL.createObjectURL(e.target.RecipeImages[0])});
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
                <Navbar />
                <form onSubmit = {this.onSubmit}>
                    <div className = "Recipe-form">
                        <label> Recipe Name: </label>
                        <input 
                            type = "Name" 
                            required 
                            className = "form-control" 
                            value = {this.state.RecipeName} 
                            onChange={this.onChangeRecipeName}
                        />
                    </div>
                    <div className = "Recipe-form">
                        <label> Recipe Description: </label>
                        <input 
                            type = "Description" 
                            placeholder="optional" 
                            className = "form-control" 
                            value = {this.state.Description} 
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="Recipe-form">
                        <label>Cuisine Type: </label>
                        <Dropdown 
                            options={CuisineType} 
                            onChange={this._onSelect} 
                            value={defaultType} 
                            placeholder="Select an option" 
                        />
                    </div>
                    <div className = "Ingredient-form" >
                        <label> Recipe Ingredients: </label>
                        <div class="row">
                            <div class="col">
                                <input 
                                    type = "Ingredients" 
                                    required 
                                    placeholder="name"
                                    className = "form-control"
                                    value = {this.state.Ingredients} 
                                    onChange={this.onChangeIngredients}
                                />
                            </div>
                            <div class="col">
                                <input 
                                    type = "Ingredients" 
                                    required 
                                    placeholder="quantity"
                                    className = "form-control" 
                                    value = {this.state.Ingredients} 
                                    onChange={this.onChangeIngredients}
                                />
                            </div>
                            <div class="col">
                                <Dropdown
                                    className = "UnitSelector"
                                    options={UnitType} 
                                    onChange={this._onSelect} 
                                    value={defaultUnit} 
                                />
                            </div>
                        </div>
                        <button className = "btn btn-outline-primary" type = "Add-Ingredients" onClick={this.addIngredientsRow} >
                            Add more ingredients
                        </button> 
                    </div>
                    <div className = "Recipe-form">
                        <label> Recipe Steps: </label>
                        <div class="row" id="Steps">
                            <div class = "col">
                                <input 
                                    type = "Steps" 
                                    required 
                                    className = "form-control" 
                                    value = {this.state.Steps} 
                                    onChange={this.onChangeSteps}
                                />
                            </div>
                        </div>
                        <button className = "btn btn-outline-primary" type = "Add-Steps" onClick={this.addStepsRow} >
                            Add more steps
                        </button> 
                    </div>
                    <div className = "Recipe-form">
                        <label>Please upload a picture of your recipe: </label>
                        <p>
                            <input 
                                type="file" 
                                onChange={this.onImageUpload} 
                                className="RecipeImage" 
                                id="RecipeImage"
                            />
                            <img id="diplay" src={this.state.RecipeImage}/>
                        </p>
                    </div>
                    <div className = "Recipe-form">
                        <input 
                            type = "Submit" 
                            value = "Submit New Recipe" 
                            className = "btn btn-primary" 
                        />
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
