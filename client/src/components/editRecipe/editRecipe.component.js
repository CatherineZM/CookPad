import React, { Component } from 'react';
import './editRecipe.css'
import Navbar from "../Navbar/navbar.component" 
import recipe1 from '../../recipes/butter-chicken.jpg'
import {Multiselect} from 'multiselect-react-dropdown';
import Container from "@material-ui/core/Container"
import Dropdown from 'react-dropdown';
import ImageUploader from 'react-images-upload'; 
import Col from 'react-bootstrap/Col';

import {getRecipe, setRecipe} from "../../actions/recipe";

const UnitType = ['(quantity)','kg', 'g','mg', 'cup(s)', 'teaspoon(s)', 'tablespoon(s)', 'mL', 'L', 'oz', 'lb(s)'];
const categoriesOptions =[
    {name: "Cake", id: 0},
    {name: "Noodles", id: 1},
    {name: "Pie", id: 2},
    {name: "Pizza", id: 3},
    {name: "Salads", id: 4},
    {name: "Sandwiches", id: 5},
    {name: "Seafood", id: 6},
    {name: "Soup", id: 7}
]; 
export default class EditRecipe extends Component {
    constructor(props){
        super(props);

        this.props.history.push('/editrecipe/'+this.props.match.params.rid)
        // requires server call to fetch the recipe information
        this.state = {
            rid: this.props.match.params.rid,
            recipe:{
                name: "",
                description: "",
                categories: [],
                ingredients: [{name:"", quantity:"", unit: ""}],
                steps:[""],
                file:{},
                filePath: "",
                creatorUsername: "",
                creatorId: ""
            },
            selectedCategories:[]
        }
        getRecipe(this, this.props.match.params.rid)
    }

    componentDidMount() {
        // this is where the server calls are invoked
        // state variable is updated hereexport
    }

    assignSelectedCategories=()=>{
        for(var i=0; i<this.state.recipe.categories.length; i++){
            this.state.selectedCategories.push(categoriesOptions[this.state.recipe.categories[i]])
            console.log(this.state.selectedCategories)
        }
    }

    ReturnView=(e)=>{
        e.preventDefault();
        // server calls are required to push the updated recipe to the server
        this.props.history.push("/viewrecipe/"+this.state.rid)
    }

    onCancel=(e)=>{
        e.preventDefault();
        this.props.history.push("/viewrecipe/"+this.state.rid)
    }

    onSubmit=(e)=>{
        e.preventDefault();
        setRecipe(this.state.rid,this)
    }

    onChangeRecipeName = (e) =>{
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    onChangeDescription = (e) =>{
        e.preventDefault();
        this.setState({ description: e.target.value });
    }

    onChangeIngredientsName = (e,index)=>{
        let ingredients = this.state.recipe.ingredients;
        ingredients[index].name = e.target.value;
        this.setState({ ingredients: ingredients });
    }

    onChangeIngredientsQuan=(e,index)=>{
        let ingredients = this.state.recipe.ingredients;
        ingredients[index].quantity = e.target.value;
        this.setState({ ingredients: ingredients });
    }

    addIngredientsRow=()=>{
       this.setState((prevState)=>({ingredients:[...prevState.ingredients, {name: "", quantity:"", unit:""}],
        }));
    }

    onChangeRemoveIngredients=(index)=>{
        this.state.recipe.ingredients.splice(index,1);
        this.setState({ingredients: this.state.recipe.ingredients})
    }

    onChangeSteps=(e,index)=>{
        let steps = this.recipe.state.steps;
        steps[index] = e.target.value;
        this.setState({ steps: steps });
    }

    addStepsRow=()=>{
        this.setState((prevState)=>({steps:[...prevState.steps, ""],
        }));
    }

    onChangeRemoveSteps=(index)=>{
        this.state.recipe.steps.splice(index,1);
        this.setState({steps: this.state.recipe.steps})
    }

    onImageUpload=(picture)=>{
        this.setState({filePath: this.state.recipe.filePath.concat(picture)});
    }

    onSelect=(selectedList, selectedItem)=>{
        const newCategories = this.state.recipe.categories;
        newCategories.push(selectedItem.id);
        this.setState({categories: newCategories})
        console.log(this.state.recipe.categories)
    }
     
    onRemove=(selectedList, removedItem)=>{
        const index = this.state.recipe.categories.findIndex((element) => element === removedItem.id)
        this.state.recipe.categories.splice(index,1);
        this.setState({categories: this.state.recipe.categories})
    }

    render(){
        const { app } = this.props;

        return(
            <div> 
            <Container maxWidth='md'>
                <Navbar app={app}/>
                <form onSubmit={this.ReturnView} className="edit-recipe">
                    <b>Edit Your Recipe</b>
                    <div className="form-group">
                    <label> Recipe Name: </label>
                        <input 
                            type = "Name" 
                            required 
                            className = "form-control" 
                            value = {this.state.recipe.name} 
                            onChange={this.onChangeRecipeName}
                        />
                    </div>
                    <div className = "Recipe-form">
                        <label> Recipe Description: </label>
                        <input 
                            type = "Description" 
                            placeholder="optional" 
                            className = "form-control" 
                            value = {this.state.recipe.description} 
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="Recipe-form">
                        <label>Cuisine Type: </label>
                        <Multiselect
                            placeholder = "Select cuisine type(s)"
                            options={categoriesOptions} 
                            selectedValues={this.state.selectedCategories}
                            onSelect={this.onSelect} 
                            onRemove={this.onRemove} 
                            displayValue="name" 
                        />
                    </div>
                    <div className = "Ingredient-form" >
                        <label> Recipe Ingredients: </label>
                        {
                            this.state.recipe.ingredients.map((ingredient, index) => {
                                return(
                                    <div className="row" id="Ingredient-row" key={index}>
                                        <Col className="col" xs={5}>
                                            <input 
                                                type = "ingredients" 
                                                required 
                                                placeholder="name"
                                                className = "form-control"
                                                value = {ingredient.name} 
                                                onChange={(e)=>this.onChangeIngredientsName(e,index)}
                                            />
                                        </Col>
                                        <Col className="col" xs={2}>
                                            <input 
                                                type = "Ingredients" 
                                                required 
                                                placeholder="quantity"
                                                className = "form-control" 
                                                value = {ingredient.quantity} 
                                                onChange={(e)=>this.onChangeIngredientsQuan(e,index)}
                                            />
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Dropdown
                                                className = "UnitSelector"
                                                options={UnitType} 
                                                onChange={this._onSelect} 
                                                value={ingredient.unit} 
                                            />
                                        </Col>
                                        <Col className ="col" xs={1}>
                                            <button 
                                                type="button"
                                                id="remove-ingredient"
                                                className = "btn btn-outline-primary" 
                                                onClick={(e)=>this.onChangeRemoveIngredients(index)}>Remove</button>
                                        </Col>
                                    </div>
                                )})
                        } 
                    </div>
                    <div className="AddIngredient-btn">
                        <button id="add-ingredient" className = "btn btn-outline-primary" type = "button" onClick={this.addIngredientsRow} >
                            Add Ingredients
                        </button>
                    </div>
                    <div className = "Step-form">
                        <label> Recipe Steps: </label>
                        {
                            this.state.recipe.steps.map((step, index) => {
                                return(
                                    <div className="row" key={index}>
                                        <Col className = "col" xs = {10}>
                                            <textarea 
                                                type = "Steps" 
                                                required 
                                                className = "form-control" 
                                                value = {step} 
                                                onChange={(e)=>this.onChangeSteps(e,index)}
                                            />
                                        </Col>
                                        <Col className ="col">
                                            <button 
                                                type="button"
                                                id="remove-step"
                                                className = "btn btn-outline-primary" 
                                                onClick={(e)=>this.onChangeRemoveSteps(index)}>Remove</button>
                                        </Col>
                                    </div>
                                )})
                        }
                    </div>
                    <div className="AddSteps-btn">
                        <button id = "add-step" className = "btn btn-outline-primary" type = "button" onClick={this.addStepsRow} >
                            Add Steps
                        </button> 
                    </div>
                    <div className = "Recipe-form">
                        <label>Please upload a picture of your recipe if you want to update: </label>
                        <div>
                            <img alt="recipe" className="Image" src={this.state.recipe.imageUrl} /> 
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
                            onSubmit = {this.onSubmit}
                            value = "Update Recipe" 
                            className = "btn btn-primary"
                        />
                        <button 
                            type="button"
                            id="cancel-edit"
                            className = "btn btn-primary" 
                            onClick={this.onCancel}>Cancel</button>
                    </div>
                </form>
            </Container>
            </div>  
        )
    }
} 