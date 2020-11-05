import React, { Component } from 'react';
import './editRecipe.css'
import Navbar from "../Navbar/navbar.component" 
import recipe1 from '../../recipes/butter-chicken.jpg'
import {Multiselect} from 'multiselect-react-dropdown';
import Container from "@material-ui/core/Container"
import Dropdown from 'react-dropdown';
import ImageUploader from 'react-images-upload'; 
import Col from 'react-bootstrap/Col';

const UnitType = ['(quantity)','kg', 'g','mg', 'cup(s)', 'teaspoon(s)', 'tablespoon(s)', 'mL', 'L', 'oz', 'lb(s)'];
const CuisineTypes =[
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

        // requires server call to fetch the recipe information
        this.state = {
            uid: this.props.match.params.uid,
            rid: this.props.match.params.rid,
            RecipeName: 'Butter Chicken',
            Description: '',
            cuisinetype: [{name: "Soup", id: 7}],
            Ingredients: [
                {name:"Butter", quantity:"2", unit:6},
                {name:"Medium onion", quantity:"1", unit:0},
                {name:"Red pepper", quantity:"1", unit:0},
                {name:"Garlic cloves", quantity:"3", unit:0},
                {name:"Grated ginger", quantity:"1", unit:6},
                {name:"Garam masala", quantity:"1", unit:5},
                {name:"Cumin", quantity:"1", unit:5},
                {name:"Red chili powder", quantity:"1", unit:5},
                {name:"Diced tomatoes", quantity:"14", unit:9},
                {name:"Heavy cream", quantity:"1", unit:4},
                {name:"Salt and pepper", quantity:"To taste", unit:0}
            ],
            Steps:[
                {content: "Heat a large pan to medium high heat and add the olive oil. Add the chicken and cook for 5 minutes, stirring, until the chicken is browned. Remove the chicken and set it aside.", id: 0}, 
                {content: "Melt the butter in the same pan. Add the onion and peppers and cook them 5 minutes to soften.", id: 1},
                {content:"Add the garlic and ginger and cook 1 minute, until they become fragrant.",id: 2},
                {content:"Add the garam masala, cumin, red chili powder, salt and pepper. Stir and cook for 1 minute.",id: 3},
                {content:"Stir in the diced tomatoes. Bring to a quick boil, then reduce the heat and simmer for 15 minutes to break everything down.",id: 4},
                {content:"Transfer the sauce to a blender or food processor and process until smooth. You can thin it out with a bit of water if you’d like.",id: 5},
                {content:"Strain the sauce back into the pan. The point is to make the sauce very smooth and heat through.",id: 6},
                {content:"Stir in the cream and add the chicken back to the pan. Heat and simmer for 10 minutes, or until the chicken is cooked through and the sauce thickens up a bit.",id: 7},
                {content:"Serve with cooked white rice and enjoy!",id: 8}
            ],
            RecipeImage: recipe1
        }
    }

    componentDidMount() {
        // this is where the server calls are invoked
        // state variable is updated here
    }

    ReturnView=(e)=>{
        e.preventDefault();
        // server calls are required to push the updated recipe to the server
        window.location = "/viewrecipe/"+this.state.uid+"/"+ this.state.rid
    }

    onCancel=(e)=>{
        e.preventDefault();
        window.location = "/viewrecipe/"+this.state.uid+"/"+ this.state.rid
    }

    onChangeRecipeName = (e) =>{
        e.preventDefault();
        this.setState({ RecipeName: e.target.value });
    }

    onChangeDescription = (e) =>{
        e.preventDefault();
        this.setState({ Description: e.target.value });
    }

    onChangeIngredientsName = (e,index)=>{
        let ingredients = this.state.Ingredients;
        ingredients[index].name = e.target.value;
        this.setState({ Ingredients: ingredients });
    }

    onChangeIngredientsQuan=(e,index)=>{
        let ingredients = this.state.Ingredients;
        ingredients[index].quantity = e.target.value;
        this.setState({ Ingredients: ingredients });
    }

    addIngredientsRow=()=>{
       this.setState((prevState)=>({Ingredients:[...prevState.Ingredients, {name: "", age:"", unit:""}],
        }));
    }

    onChangeRemoveIngredients=(index)=>{
        this.state.Ingredients.splice(index,1);
        this.setState({Ingredients: this.state.Ingredients})
    }

    onChangeSteps=(e,index)=>{
        let steps = this.state.Steps;
        steps[index] = e.target.value;
        this.setState({ Steps: steps });
    }

    addStepsRow=()=>{
        this.setState((prevState)=>({Steps:[...prevState.Steps, ""],
        }));
    }

    onChangeRemoveSteps=(index)=>{
        this.state.Steps.splice(index,1);
        this.setState({Steps: this.state.Steps})
    }

    onImageUpload=(picture)=>{
        this.setState({RecipeImage: this.state.RecipeImage.concat(picture)});
    }

    render(){
        return(
            <div> 
            
            <Container maxWidth='md'>
                <Navbar uid={this.state.uid}/>
                <form onSubmit={this.ReturnView} className="edit-recipe">
                    <b>Edit Your Recipe</b>
                    <div className="form-group">
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
                            options={CuisineTypes} 
                            selectedValues={this.state.cuisinetype} 
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
                                    <div className="row" id="Ingredient-row" key={index}>
                                        <Col className="col" xs={5}>
                                            <input 
                                                type = "Ingredients" 
                                                required 
                                                placeholder="name"
                                                className = "form-control"
                                                value = {Ingredient.name} 
                                                onChange={(e)=>this.onChangeIngredientsName(e,index)}
                                            />
                                        </Col>
                                        <Col className="col" xs={2}>
                                            <input 
                                                type = "Ingredients" 
                                                required 
                                                placeholder="quantity"
                                                className = "form-control" 
                                                value = {Ingredient.quantity} 
                                                onChange={(e)=>this.onChangeIngredientsQuan(e,index)}
                                            />
                                        </Col>
                                        <Col className="col" xs={3}>
                                            <Dropdown
                                                className = "UnitSelector"
                                                options={UnitType} 
                                                onChange={this._onSelect} 
                                                value={UnitType[Ingredient.unit]} 
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
                        <button id="add-ingredient" className = "btn btn-outline-primary" type = "Add-Ingredients" onClick={this.addIngredientsRow} >
                            Add Ingredients
                        </button>
                    </div>
                    <div className = "Step-form">
                        <label> Recipe Steps: </label>
                        {
                            this.state.Steps.map((step, index) => {
                                return(
                                    <div className="row" key={index}>
                                        <Col className = "col" xs = {10}>
                                            <textarea 
                                                type = "Steps" 
                                                required 
                                                className = "form-control" 
                                                value = {step.content} 
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
                        <button id = "add-step" className = "btn btn-outline-primary" type = "Add-Steps" onClick={this.addStepsRow} >
                            Add Steps
                        </button> 
                    </div>
                    <div className = "Recipe-form">
                        <label>Please upload a picture of your recipe if you want to update: </label>
                        <div>
                            <img alt="recipe" className="Image"src={recipe1}/> 
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