import React, { Component } from 'react';
import Container from "@material-ui/core/Container"
import './viewProfile.css'
import Navbar from "../Navbar/navbar.component"
import RecipeList from '../recipelist/recipelist.component'
import Avatar from 'react-avatar';
import {Collapse} from 'react-bootstrap'

// hard coded images
import ProfilePic from'./default-profile-pic.png' 
import recipe1 from '../../recipes/butter-chicken.jpg'
import recipe2 from '../../recipes/lemon-zucchini-bread.jpg'
import recipe3 from '../../recipes/ramen.jpg'
import recipe4 from '../../recipes/vanilla-cake.png'
import recipe5 from '../../recipes/spaghetti.png'
import recipe6 from '../../recipes/apple-pie.png'
import recipe7 from '../../recipes/homemade-pizza.png'
import recipe8 from '../../recipes/greek-salad.png'
import recipe9 from '../../recipes/seafood-sandwiches.png'
import recipe10 from '../../recipes/seafood-stew.png'
import recipe11 from '../../recipes/Chicken-Noodle-Soup.jpg'
import { FaRegEdit } from "react-icons/fa";
import {getUser} from "../../actions/user";
import {getMyRecipe, getMyCollection} from "../../actions/recipe";

export default class ViewProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            user: {},
            userpicture: {src: ProfilePic},
            recipes: [],
            collectedRecipes:[],
            recipeExpanded: false,
            collectionExpanded: false,
        }
        this.props.history.push('/viewprofile/'+this.props.match.params.uid);
        
    }


    componentDidMount() {
        // requires server calls to initialize recipes and user profile
        getUser(this);
        getMyRecipe(this);
        getMyCollection(this);
        
    }

    handleRecipeExpandClick = () => {
        if(this.state.recipeExpanded){
            this.setState({ recipeExpanded: false });
        }else{
            this.setState({ recipeExpanded: true });
        }
    }

    handleCollectionExpandClick= () => {
        if(this.state.collectionExpanded){
            this.setState({ collectionExpanded: false });
        }else{
            this.setState({ collectionExpanded: true });
        }
    }

     clickHeart=(rid)=>{
        // need to update the information into database
        let new_recipes = this.state.recipes;
        this.state.recipes.forEach((recipe, idx)=>{
            if(recipe.id === rid){
                if(recipe.liked){
                    new_recipes[idx].liked = false;
                    new_recipes[idx].likes--;
                    this.setState({ recipes: new_recipes });
                }else{
                    new_recipes[idx].liked = true;
                    new_recipes[idx].likes++;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
    }

    clickStar=(rid)=>{
        // need to update the information into database
        let new_recipes = this.state.recipes;
        this.state.recipes.forEach((recipe, idx)=>{
            if(recipe.id === rid){
                if(recipe.collected){
                    new_recipes[idx].collected = false;
                    this.setState({ recipes: new_recipes });
                }else{
                    new_recipes[idx].collected = true;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
    }

    editprofile=(e)=>{
        e.preventDefault();
        this.props.history.push("/editprofile/"+ this.state.uid);
    }

    editButtonGenerator=(app)=>{
        if (app.state.currentUser === this.state.user._id){
            return <button type="button"
            className = "btn btn-outline-primary"
            onClick={this.editprofile}>
            <FaRegEdit/>
            Edit Profile
            </button>
        }
        
    }

    RecipeExpandButtonGenerator=()=>{
        if(this.state.recipeExpanded){
            return <button type="button"
                    className = "btn btn-outline-primary" 
                    onClick={this.handleRecipeExpandClick}>
                    Collapse 
                    </button>
        }else{
            return <button type="button"
            className = "btn btn-outline-primary" 
            onClick={this.handleRecipeExpandClick}>
            View 
            </button>
        }
    }

    CollectionExpandButtonGenerator=()=>{
       if(this.state.collectionExpanded){
            return <button type="button"
                    className = "btn btn-outline-primary" 
                    onClick={this.handleCollectionExpandClick}>
                    Collapse 
                    </button>
        }else{
            return <button type="button"
                    className = "btn btn-outline-primary" 
                    onClick={this.handleCollectionExpandClick}>
                    View 
                    </button>
        }
    }

    clickRecipe=(rid)=>{
        this.props.history.push("/viewrecipe/" + rid);
    }

    CollectionRecipeGenerator=()=>{
        if(this.state.recipeExpanded){
            return <div id="collection-recipeswithEx">
                <h4>My Collection
                {this.CollectionExpandButtonGenerator()}
                </h4>
                <Collapse in={this.state.collectionExpanded}>
                    <div className="recipe-list">
                        <RecipeList   
                            recipes={this.state.collectedRecipes}
                            clickHeart={this.clickHeart}
                            clickStar={this.clickStar}
                            clickRecipe = {this.clickRecipe}
                        />    
                    </div>
                </Collapse> 
            </div>
        }else if(!this.state.recipeExpanded){
            return <div id="collection-recipes">
                    <h4>My Collection
                    {this.CollectionExpandButtonGenerator()}
                    </h4>
                    <Collapse in={this.state.collectionExpanded}>
                        <div className="recipe-list">
                            <RecipeList   
                                recipes={this.state.collectedRecipes}
                                clickHeart={this.clickHeart}
                                clickStar={this.clickStar}
                                clickRecipe = {this.clickRecipe}
                            />    
                        </div>
                    </Collapse> 
                </div>
        }
    }

    render(){
        const { app } = this.props;
        return(
            <div>
            <Container maxWidth='md'>
                <Navbar app={app}/>
                <div id="user-profile">
                    <h4>{this.state.user.username + "'s Profile"}</h4>
                    <Avatar id="user-picture" name="user" size="150" round={true} src={this.state.userpicture.src}/> 
                    <div>{this.state.user.description}</div>
                    {this.editButtonGenerator(app)}
                </div>
                
                
                <div id="user-recipes">
                    <h4>My Recipes
                    <this.RecipeExpandButtonGenerator />
                    </h4>
                    <Collapse in={this.state.recipeExpanded}>
                        <div className="recipe-list">
                            <RecipeList   
                                recipes={this.state.recipes}
                                clickHeart={this.clickHeart}
                                clickStar={this.clickStar}
                                clickRecipe = {this.clickRecipe}
                            />    
                        </div>
                    </Collapse>
                </div>
                <this.CollectionRecipeGenerator/>
            </Container>
            </div> 
        )
    }
} 