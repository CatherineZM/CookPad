import React, { Component } from 'react';
import './editRecipe.css'
import Navbar from "../Navbar/navbar.component"
import {Multiselect} from 'multiselect-react-dropdown';
import {Container} from "@material-ui/core"
import ImageUploader from 'react-images-upload'; 
import Col from 'react-bootstrap/Col';

import {getRecipe, updateRecipe} from "../../actions/recipe";

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
            }
        }
        getRecipe(this, this.props.match.params.rid)
    }

    ReturnView=(e)=>{
        e.preventDefault();
        const newRecipe = {
            name: this.state.recipe.name,
            description: this.state.recipe.description,
            categories: this.state.recipe.categories,
            ingredients: this.state.recipe.ingredients,
            steps: this.state.recipe.steps,
            file: this.state.recipe.file
        }
        updateRecipe(this,newRecipe)
    }

    onCancel=(e)=>{
        e.preventDefault();
        this.props.history.push("/viewrecipe/"+this.state.rid)
    }

    onChangeRecipeName = (e) =>{
        e.preventDefault();
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.name = e.target.value;
        this.setState({ recipe: recipeCopy });
    }

    onChangeDescription = (e) =>{
        e.preventDefault();
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.description = e.target.value;
        this.setState({ recipe: recipeCopy });
    }

    onChangeIngredientsName = (e,index)=>{
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.ingredients[index].name = e.target.value;
        this.setState({ recipe: recipeCopy });
    }

    onChangeIngredientsQuan=(e,index)=>{
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.ingredients[index].quantity = e.target.value;
        this.setState({ recipe: recipeCopy });
    }

    onSelectIngredientsUnit=(e,index)=>{
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.ingredients[index].unit = e.target.value;
        this.setState({ recipe: recipeCopy });
    }

    addIngredientsRow=()=>{
       this.setState((prevState)=>({recipe:{...prevState.recipe,ingredients:[...prevState.recipe.ingredients, {name:"", quantity:"", unit: ""}]},
        }));
    }

    onChangeRemoveIngredients=(index)=>{
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.ingredients.splice(index,1);
        this.setState({ recipe: recipeCopy });
    }

    onChangeSteps=(e,index)=>{
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.steps[index] = e.target.value;
        this.setState({ recipe: recipeCopy });
    }

    addStepsRow=()=>{
        this.setState((prevState)=>({recipe:{...prevState.recipe,steps:[...prevState.recipe.steps, ""]},
        }));
    }

    onChangeRemoveSteps=(index)=>{
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.steps.splice(index,1);
        this.setState({ recipe: recipeCopy });
    }

    onImageUpload=(picture)=>{
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.file = picture[0]
        this.setState({ recipe: recipeCopy });
    }

    onSelect=(selectedList, selectedItem)=>{
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.categories.push(selectedItem.id);
        this.setState({ recipe: recipeCopy });
    }
     
    onRemove=(selectedList, removedItem)=>{
        const index = this.state.recipe.categories.findIndex((element) => element === removedItem.id)
        let recipeCopy = JSON.parse(JSON.stringify(this.state.recipe))
        recipeCopy.categories.splice(index,1);
        this.setState({ recipe: recipeCopy });
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
                            selectedValues={categoriesOptions.filter(c => this.state.recipe.categories.includes(c.id))}
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
                                            <select class="form-control" value = {ingredient.unit} name="units" id="units" onChange={(e)=>this.onSelectIngredientsUnit(e,index)}>
                                                <option value={UnitType[0]}>{UnitType[0]}</option>
                                                <option value={UnitType[1]}>{UnitType[1]}</option>
                                                <option value={UnitType[2]}>{UnitType[2]}</option>
                                                <option value={UnitType[3]}>{UnitType[3]}</option>
                                                <option value={UnitType[4]}>{UnitType[4]}</option>
                                                <option value={UnitType[5]}>{UnitType[5]}</option>
                                                <option value={UnitType[6]}>{UnitType[6]}</option>
                                                <option value={UnitType[7]}>{UnitType[7]}</option>
                                                <option value={UnitType[8]}>{UnitType[8]}</option>
                                                <option value={UnitType[9]}>{UnitType[9]}</option>
                                                <option value={UnitType[10]}>{UnitType[10]}</option>
                                                <option value={UnitType[11]}>{UnitType[11]}</option>
                                            </select>           
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