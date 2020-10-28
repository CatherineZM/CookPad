import React, {Component} from 'react';
import {NewRecipe} from '../../object';
import './addRecipe-style.css'
import Navbar from "../Navbar/navbar.component";
//import { DrawerLayoutAndroidBase } from 'react-native';
import Dropdown from 'react-dropdown';
import {Multiselect} from 'multiselect-react-dropdown';
import ImageUploader from 'react-images-upload';
import 'react-dropdown/style.css';
//import { TouchableHighlightBase } from 'react-native';

const UnitType = ['(quantity)','kg', 'g','mg', 'cup(s)', 'teaspoon(s)', 'tablespoon(s)', 'mL', 'L', 'oz', 'lb(s)'];

const defaultUnit = UnitType[0];

export default class AddRecipe extends Component {
    constructor(props){
        super(props);
        this.onChangeRecipeName = this.onChangeRecipeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeIngredientsName = this.onChangeIngredientsName.bind(this);
        this.onChangeIngredientsQuan = this.onChangeIngredientsQuan.bind(this);
        this.addIngredientsRow = this.addIngredientsRow.bind(this);
        this.onChangeSteps = this.onChangeSteps.bind(this);
        this.addStepsRow = this.addStepsRow.bind(this);
        this.onChangeRemoveSteps = this.onChangeRemoveSteps.bind(this); 
        this.onImageUpload = this.onImageUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            RecipeName: '',
            Description: '',
            Ingredients: [{name:"", quantity:"", unit:""}],
            Steps:[],
            RecipeImages: [],
            recipes: this.props.appState.recipes,
            recipeCount: this.props.appState.recipeCount,
            CuisineTypes :[
                {name: "Cake", id: 1},
                {name: "Noodles", id: 2},
                {name: "Pie", id: 3},
                {name: "Pizza", id: 4},
                {name: "Salads", id: 5},
                {name: "Sandwiches", id: 6},
                {name: "Seafood", id: 7},
                {name: "Soup", id: 8}
            ]
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

    onChangeIngredientsName(e,index){
        let ingredients = this.state.Ingredients;
        ingredients[index].name = e.target.value;
        this.setState({ Ingredients: ingredients });
    }

    onChangeIngredientsQuan(e,index){
        let ingredients = this.state.Ingredients;
        ingredients[index].quantity = e.target.value;
        this.setState({ Ingredients: ingredients });
    }

    addIngredientsRow(){
       this.setState((prevState)=>({Ingredients:[...prevState.Ingredients, {name: "", age:"", unit:""}],
        }));
    }

    onChangeSteps(e,index){
        let steps = this.state.Steps;
        steps[index] = e.target.value;
        this.setState({ Steps: steps });
    }

    addStepsRow(){
        this.setState((prevState)=>({Steps:[...prevState.Steps, ""],
        }));
    }

    onChangeRemoveSteps(index){
        this.state.Steps.splice(index,1);

        this.setState({Steps: this.state.Steps})
    }

    onImageUpload(picture){
        this.setState({RecipeImages: this.state.RecipeImages.concat(picture),});
    }

    onSubmit(e){
        e.preventDefault();
        this.createRecipe();
        window.location = "./../homepage/:uid";
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
                        <Multiselect
                            placeholder = "Select cuisine type(s)"
                            options={this.state.CuisineTypes} 
                            selectedValues={this.state.selectedValue} 
                            onSelect={this.onSelect} 
                            onRemove={this.onRemove} 
                            displayValue="name" 
                        />
                    </div>
                    <div className = "Ingredient-form" >
                        <label> Recipe Ingredients: </label>
                         {
                            this.state.Ingredients.map((Ingredient, index) => {
                                return(
                                    <div class="row" id="Ingredient-row" key={index}>
                                        <div class="col">
                                            <input 
                                                type = "Ingredients" 
                                                required 
                                                placeholder="name"
                                                className = "form-control"
                                                value = {Ingredient.name} 
                                                onChange={(e)=>this.onChangeIngredientsName(e,index)}
                                            />
                                        </div>
                                        <div class="col">
                                            <input 
                                                type = "Ingredients" 
                                                required 
                                                placeholder="quantity"
                                                className = "form-control" 
                                                value = {Ingredient.quantity} 
                                                onChange={(e)=>this.onChangeIngredientsQuan(e,index)}
                                            />
                                        </div>
                                        <div class="col">
                                            <Dropdown
                                                className = "UnitSelector"
                                                options={UnitType} 
                                                onChange={this._onSelect} 
                                                placeholder ={defaultUnit}
                                                value={Ingredient.unit} 
                                            />
                                        </div>
                                    </div>
                                )})
                        } 
                    </div>
                    <div className="AddIngredient-btn">
                        <button className = "btn btn-outline-primary" type = "Add-Ingredients" onClick={this.addIngredientsRow} >
                            Add Ingredients
                        </button>
                    </div>
                    <div className = "Step-form">
                        <label> Recipe Steps: </label>
                        {
                            this.state.Steps.map((step, index) => {
                                return(
                                    <div class="row" key={index}>
                                        <div class = "col">
                                            <input 
                                                type = "Steps" 
                                                required 
                                                placeholder="Enter a step"
                                                className = "form-control" 
                                                value = {step} 
                                                onChange={(e)=>this.onChangeSteps(e,(index))}
                                            />
                                        </div>
                                        <div class ="col">
                                            <button 
                                                className = "btn btn-outline-primary" 
                                                onClick={this.onChangeRemoveSteps}>Remove</button>
                                        </div>
                                    </div>
                                )})
                        }
                        
                    </div>
                    <div className="AddSteps-btn">
                        <button className = "btn btn-outline-primary" type = "Add-Steps" onClick={this.addStepsRow} >
                            Add Steps
                        </button> 
                    </div>
                    <div className = "Recipe-form">
                        <label>Please upload a picture of your recipe: </label>
                        <div>
                            <ImageUploader
                                withIcon = {false}
                                withPreview = {true}
                                singleImage = {true}
                                buttonText = 'Upload a picture for your recipe'
                                onChange={this.onImageUpload}
                                imgExtension={['.jpg', '.png', '.JPG', '.PNG']}
                                maxFileSize={5242880}
                            />
                        </div>
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
        this.state.recipes.push(Recipe);
        this.setState({recipeCount: this.state.recipeCount+1});
    }
    
} 
