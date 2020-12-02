import React, { Component } from 'react';
import Container from "@material-ui/core/Container"
import './viewProfile.css'
import Navbar from "../Navbar/navbar.component"
import RecipeList from '../recipelist/recipelist.component'
import Avatar from 'react-avatar';
import {Collapse} from 'react-bootstrap'
import {DeleteFromRecipeList, addToRecipeList} from '../../actions/user';
import {setRecipe} from '../../actions/recipe'

// hard coded images
import ProfilePic from'./default-profile-pic.png' 
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
            dummy: 0,
        }
        this.props.history.push('/viewprofile/'+this.props.match.params.uid);
        getUser(this, ()=>{
            getMyRecipe(this);
            getMyCollection(this);
        })
        console.log(this.state.collectedRecipes)
    }


    componentDidMount() {
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
        let newLikes = 0;
        const new_recipes = [];
        const new_collectedRecipes = [];
        if(this.props.app.state.currentUser.likedRecipes.includes(rid)){
            this.props.app.state.currentUser.likedRecipes = this.props.app.state.currentUser.likedRecipes.filter(recipe=> recipe !== rid)
            DeleteFromRecipeList(this.props.app.state.currentUser._id, {likedRecipes: rid})
            this.state.recipes.forEach((recipe)=>{
                const new_recipe = Object.create(recipe)
                if(recipe._id === rid){
                    new_recipe.likes--;
                    newLikes = new_recipe.likes;
                }
                new_recipes.push(new_recipe)
            })
            this.setState({ recipes: new_recipes });

            this.state.collectedRecipes.forEach((recipe)=>{
                const new_recipe = Object.create(recipe)
                if(new_recipe._id === rid){
                    new_recipe.likes--;
                }
                new_collectedRecipes.push(new_recipe)
            })
            this.setState({ collectedRecipes: new_collectedRecipes });
        }else{
            this.props.app.state.currentUser.likedRecipes.push(rid)
            addToRecipeList(this.props.app.state.currentUser._id, {likedRecipes: rid})
            this.state.recipes.forEach((recipe)=>{
                const new_recipe = Object.create(recipe)
                if(recipe._id === rid){
                    new_recipe.likes++;
                    newLikes = new_recipe.likes;
                }
                new_recipes.push(new_recipe)
            })
            this.setState({ recipes: new_recipes });

            this.state.collectedRecipes.forEach((recipe)=>{
                const new_recipe = Object.create(recipe)
                if(new_recipe._id === rid){
                    new_recipe.likes++;
                }
                new_collectedRecipes.push(new_recipe)
            })
            this.setState({ collectedRecipes: new_collectedRecipes });
        }

        // server call to update recipe
        setRecipe(rid, {likes: newLikes})
    }

    clickStar=(rid)=>{
        if(this.props.app.state.currentUser.collectedRecipes.includes(rid)){
            this.props.app.state.currentUser.collectedRecipes = this.props.app.state.currentUser.collectedRecipes.filter(recipe=> recipe !== rid)
            DeleteFromRecipeList(this.props.app.state.currentUser._id, {collectedRecipes: rid})
        }else{
            this.props.app.state.currentUser.collectedRecipes.push(rid)
            addToRecipeList(this.props.app.state.currentUser._id, {collectedRecipes: rid})
        }
        this.setState({dummy: 0})
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
                    <this.RecipeExpandButtonGenerator/>
                    </h4>
                    <Collapse in={this.state.recipeExpanded}>
                        <div className="recipe-list">
                            <RecipeList   
                                recipes={this.state.recipes}
                                clickHeart={this.clickHeart}
                                clickStar={this.clickStar}
                                clickRecipe = {this.clickRecipe}
                                app={app}
                            />    
                        </div>
                    </Collapse>
                </div>

                { this.state.recipeExpanded && 
                    <div id="collection-recipeswithEx">
                    <h4>My Collection
                    <this.CollectionExpandButtonGenerator/>
                    </h4>
                    <Collapse in={this.state.collectionExpanded}>
                        <div className="recipe-list">
                            <RecipeList   
                                recipes={this.state.collectedRecipes}
                                clickHeart={this.clickHeart}
                                clickStar={this.clickStar}
                                clickRecipe = {this.clickRecipe}
                                app = {this.props.app}
                            />    
                        </div>
                    </Collapse> 
                    </div>
                }

                { !this.state.recipeExpanded && 
                    <div id="collection-recipes">
                        <h4>My Collection
                        <this.CollectionExpandButtonGenerator/>
                        </h4>
                        <Collapse in={this.state.collectionExpanded}>
                            <div className="recipe-list">
                                <RecipeList   
                                    recipes={this.state.collectedRecipes}
                                    clickHeart={this.clickHeart}
                                    clickStar={this.clickStar}
                                    clickRecipe = {this.clickRecipe}
                                    app = {this.props.app}
                                />    
                            </div>
                        </Collapse> 
                    </div>
                }
            </Container>
            </div> 
        )
    }
} 