import React, {Component} from 'react';
import Col from 'react-bootstrap/Col';
import {Container} from "@material-ui/core"
import {Multiselect} from 'multiselect-react-dropdown';
import ImageUploader from 'react-images-upload';

// import css style sheets
import 'react-dropdown/style.css';
import './addRecipe.css'

// import components
import Navbar from "../Navbar/navbar.component";

// import actions
import {addRecipe} from "../../actions/recipe"

const UnitType = ['(quantity)','kg', 'g','mg', 'cup(s)', 'teaspoon(s)', 'tablespoon(s)', 'mL', 'L', 'oz', 'lb(s)'];

export default class AddRecipe extends Component {
    constructor(props){
        super(props);
        this.props.history.push("/addrecipe");
        this.state = {
            creatorId: this.props.app.state.currentUser._id,
            creatorUsername: this.props.app.state.currentUser.username,
            name: '',
            description: '',
            ingredients: [{name:"", quantity:"", unit:""}],
            steps:[""],
            file: {},
            filePath: "",
            categories:[],
            categoriesOptions :[
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
        this.setState({ name: e.target.value });
    }

    onChangeDescription = (e) =>{
        e.preventDefault();
        this.setState({ description: e.target.value });
    }

    onChangeIngredientsName = (e,index)=>{
        const newIngredients = this.state.ingredients;
        newIngredients[index].name = e.target.value;
        this.setState({ ingredients: newIngredients });
    }

    onChangeIngredientsQuan=(e,index)=>{
        const newIngredients = this.state.ingredients;
        newIngredients[index].quantity = e.target.value;
        this.setState({ ingredients: newIngredients });
    }

    onSelectIngredientsUnit=(e,index)=>{
        const newIngredients = this.state.ingredients;
        newIngredients[index].unit = e.target.value;
        this.setState({ ingredients: newIngredients });
        console.log(e.target.value);
    }

    addIngredientsRow=()=>{
       this.setState((prevState)=>({ingredients:[...prevState.ingredients, {name: "", age:"", unit:""}],
        }));
    }

    onChangeRemoveIngredients=(index)=>{
        const NewIngredients = this.state.ingredients
        NewIngredients.splice(index,1);
        this.setState({ingredients: NewIngredients})
    }

    onChangeSteps=(e,index)=>{
        const newSteps = this.state.steps;
        newSteps[index] = e.target.value;
        this.setState({ steps: newSteps });
    }

    addStepsRow=()=>{
        this.setState((prevState)=>({steps:[...prevState.steps, ""],
        }));
    }

    onChangeRemoveSteps=(index)=>{
        this.state.steps.splice(index,1);
        this.setState({steps: this.state.steps})
    }

    onImageUpload=(picture)=>{
        this.setState({file: picture[0]});
    }

    onSelect=(selectedList, selectedItem)=>{
        const newCategories = this.state.categories;
        newCategories.push(selectedItem.id);
        this.setState({categories: newCategories})
        console.log(this.state.categories)
    }
     
    onRemove=(selectedList, removedItem)=>{
        const index = this.state.categories.findIndex((element) => element === removedItem.id)
        this.state.categories.splice(index,1);
        this.setState({categories: this.state.categories})
    }

    onSubmit=async(e,app)=>{
        e.preventDefault();
        addRecipe(this,app);
    }

    render(){ 
        const { app } = this.props;

        return(
            <div>
            <Container maxWidth='md'>
                <Navbar app={app}/>
                <form onSubmit = {this.onSubmit} className="add-recipe">
                    <b>Create A Recipe</b>
                    <div className = "recipe-form">
                        <label> Recipe Name: </label>
                        <input 
                            type = "Name" 
                            required 
                            placeholder="Your Recipe Name" 
                            className = "form-control" 
                            value = {this.state.name} 
                            onChange={this.onChangeRecipeName}
                        />
                    </div>
                    <div className = "recipe-form">
                        <label> Recipe Description: </label>
                        <input 
                            type = "Description" 
                            required
                            placeholder="Enter description for your recipe" 
                            className = "form-control" 
                            value = {this.state.description} 
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="recipe-form">
                        <label>Cuisine Type: </label>
                        <Multiselect
                            placeholder = "Select cuisine type(s)"
                            options={this.state.categoriesOptions}  
                            onSelect={this.onSelect} 
                            onRemove={this.onRemove}
                            displayValue="name" 
                        />    
                    </div>
                    <div className = "ingredient-form" >
                        <label> Recipe Ingredients: </label>
                         {
                            this.state.ingredients.map((Ingredient, index) => {
                                return(
                                    <div className="row" id="ingredient-row" key={index}>
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
                                            <select class="form-control "name="units" id="units" onChange={(e)=>this.onSelectIngredientsUnit(e,index)}>
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
                                                id="remove-ingredient"
                                                type="button"
                                                className = "btn btn-outline-primary" 
                                                onClick={(e)=>this.onChangeRemoveIngredients(index)}>Remove</button>
                                        </Col>
                                    </div>
                                )})
                        } 
                    </div>
                    <div className="add-ingredient-btn">
                        <button id="add-ingredient" className = "btn btn-outline-primary" type = "button" onClick={this.addIngredientsRow} >
                            Add Ingredients
                        </button>
                    </div>
                    <div className = "step-form">
                        <label> Recipe Steps: </label>
                        {
                            this.state.steps.map((step, index) => {
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
                                                id="remove-step"
                                                type="button"
                                                className = "btn btn-outline-primary" 
                                                onClick={(e)=>this.onChangeRemoveSteps(index)}>Remove</button>
                                        </Col>
                                    </div>
                                )})
                        }
                        
                    </div>
                    <div className="add-steps-btn">
                        <button id = "add-step" className = "btn btn-outline-primary" type = "button" onClick={this.addStepsRow} >
                            Add Steps
                        </button> 
                    </div>
                    <div className = "recipe-form">
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
                    <div className = "recipe-form">
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
