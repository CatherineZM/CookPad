import React, {Component} from 'react';
import './style.css'
import Navbar from "../Navbar/navbar.component";
import Dropdown from 'react-dropdown';
import Container from "@material-ui/core/Container"
import {Multiselect} from 'multiselect-react-dropdown';
import ImageUploader from 'react-images-upload';
import 'react-dropdown/style.css';
import Col from 'react-bootstrap/Col';

const UnitType = ['(quantity)','kg', 'g','mg', 'cup(s)', 'teaspoon(s)', 'tablespoon(s)', 'mL', 'L', 'oz', 'lb(s)'];

const defaultUnit = UnitType[0];

export default class AddRecipe extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            RecipeName: '',
            Description: '',
            Ingredients: [{name:"", quantity:"", unit:""}],
            Steps:[],
            RecipeImages: [],
            CuisineTypes :[
                {name: "Cake", id: 0},
                {name: "Noodles", id: 1},
                {name: "Pie", id: 2},
                {name: "Pizza", id: 3},
                {name: "Salads", id: 4},
                {name: "Sandwiches", id: 5},
                {name: "Seafood", id: 6},
                {name: "Soup", id: 7}
            ]
        }
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
        this.setState({RecipeImages: this.state.RecipeImages.concat(picture),});
    }

    onSubmit=(e)=>{
        e.preventDefault();
        // push the recipe to the database
        window.location = "/homepage/" + this.state.uid;
    }

    render(){ 
        return(
            <div>
            <Navbar uid={this.state.uid}/>
            <Container maxWidth='md'>
                
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
                                                placeholder ={defaultUnit}
                                                value={Ingredient.unit} 
                                            />
                                        </Col>
                                        <Col className ="col" xs={1}>
                                            <button 
                                                type="button"
                                                className = "btn btn-outline-primary" 
                                                onClick={(e)=>this.onChangeRemoveIngredients(index)}>Remove</button>
                                        </Col>
                                    </div>
                                )})
                        } 
                    </div>
                    <div className="AddIngredient-btn">
                        <button className = "btn btn-outline-primary" type = "button" onClick={this.addIngredientsRow} >
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
                                                placeholder="Enter a step"
                                                className = "form-control" 
                                                value = {step} 
                                                onChange={(e)=>this.onChangeSteps(e,(index))}
                                            />
                                        </Col>
                                        <Col className ="col">
                                            <button 
                                                type="button"
                                                className = "btn btn-outline-primary" 
                                                onClick={(e)=>this.onChangeRemoveSteps(index)}>Remove</button>
                                        </Col>
                                    </div>
                                )})
                        }
                        
                    </div>
                    <div className="AddSteps-btn">
                        <button className = "btn btn-outline-primary" type = "button" onClick={this.addStepsRow} >
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
            </Container>
            </div>
        )
    }
} 
