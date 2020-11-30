import React, {Component} from 'react';
import axios from "axios";
import './addRecipe.css'
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
        this.props.history.push("/addrecipe");
        this.state = {
            name: '',
            description: '',
            ingredients: [{name:"", quantity:"", unit:""}],
            steps:[],
            RecipeImage: [],
            selectedCategories:[],
            categories :[
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
        const NewIngredients = this.state.ingredients;
        NewIngredients[index].quantity = e.target.value;
        this.setState({ ingredients: NewIngredients });
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
        this.setState({RecipeImage: this.state.RecipeImage.concat(picture)});
    }

    onSelect=(selectedList)=>{
        this.setState({selectedCategories: selectedList})
        console.log(this.state.selectedCategories)
    }
     
    onRemove=(selectedList)=>{
        this.setState({selectedCategories: selectedList})
    }

    onSubmit=async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.RecipeImage[0]);

        try{
            const res1 = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const { filePath } = res1.data;

            const recipe = {
                name: this.state.name,
                description: this.state.description,
                categories: [0,1,2], // TODO: change this later
                creator: this.props.app.state.currentUser._id,
                steps: this.state.steps,
                ingredients: this.state.ingredients,
                filePath: filePath
            }

            const res2 = await axios.post('/api/recipes', recipe);
            console.log(res2)
        }catch(err){
            if(err.response.status === 500){
                console.log('There was a problem with the server')
            } else{
                console.log(err)
            }
        }
        // push the recipe to the server, use the filepath and filename
        
        this.props.history.push("/homepage");
    }

    render(){ 
        const { app } = this.props;

        return(
            <div>
            <Container maxWidth='md'>
                <Navbar app={app}/>
                <form onSubmit = {this.onSubmit} className="add-recipe">
                    <b>Create A Recipe</b>
                    <div className = "Recipe-form">
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
                    <div className = "Recipe-form">
                        <label> Recipe Description: </label>
                        <input 
                            type = "Description" 
                            placeholder="optional" 
                            className = "form-control" 
                            value = {this.state.description} 
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="Recipe-form">
                        <label>Cuisine Type: </label>
                        <Multiselect
                            placeholder = "Select cuisine type(s)"
                            options={this.state.categories} 
                            selectedValues={this.state.selectedValue} 
                            onSelect={this.onSelect} 
                            onRemove={this.onRemove} 
                            displayValue="name" 
                        />
                    </div>
                    <div className = "Ingredient-form" >
                        <label> Recipe Ingredients: </label>
                         {
                            this.state.ingredients.map((Ingredient, index) => {
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
                                                id="remove-ingredient"
                                                type="button"
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
                    <div className="AddSteps-btn">
                        <button id = "add-step" className = "btn btn-outline-primary" type = "button" onClick={this.addStepsRow} >
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
