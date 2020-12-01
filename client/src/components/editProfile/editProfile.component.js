import React, { Component } from 'react';
import Container from '@material-ui/core/Container'
import './editProfile.css'
import Navbar from "../Navbar/navbar.component"
import RecipeList from '../recipelist/recipelist.component'
import Avatar from 'react-avatar-edit';
import {Collapse} from 'react-bootstrap'

import ProfilePic from'../viewProfile/default-profile-pic.png' 
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
import { FaRegSave } from "react-icons/fa";

export default class EditProfile extends Component {
    constructor(props, app){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            password: "user",
            username: "Catherine", 
            userpicture: {src: ProfilePic},
            picturePreview: null, 
            description: "I love baking!!!",
            recipes: [
                {id:4, src:recipe5, liked: false, collected: false, title:'Homemade Spaghetti', likes:65, categories:[1]},
                {id:5, src:recipe6, liked: false, collected: false, title:'Apple Pie', likes:63, categories:[2]},
                {id:6, src:recipe7, liked: false, collected: false, title:'Homemade Pizza', likes:62, categories:[3]},
                {id:7, src:recipe8, liked: false, collected: false, title:'Greek Salad', likes:60, categories:[4]},
                {id:8, src:recipe9, liked: false, collected: false, title:'Seafood Sandwiches', likes:58, categories:[5, 6]},
                {id:9, src:recipe10, liked: false, collected: false, title:'Spicy seafood stew', likes:50, categories:[6, 7]},
                {id:10, src:recipe11, liked: false, collected: false, title:'Chicken Noodle Soup', likes:47, categories:[7]}
            ],
            collectRecipes:[{id:0, src:recipe1, liked: false, collected: false, title:'Butter Chicken', likes: 123, categories:[7]},
            {id:1, src:recipe2, liked: false, collected: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
            {id:2, src:recipe3, liked: false, collected: false, title:'Ramen', likes:98, categories:[1]},
            {id:3, src:recipe4, liked: false, collected: false, title:'Vanilla Cake', likes:76, categories:[0]},
            {id:4, src:recipe5, liked: false, collected: false, title:'Homemade Spaghetti', likes:65, categories:[1]},
            {id:5, src:recipe6, liked: false, collected: false, title:'Apple Pie', likes:63, categories:[2]},
            {id:6, src:recipe7, liked: false, collected: false, title:'Homemade Pizza', likes:62, categories:[3]},
            {id:7, src:recipe8, liked: false, collected: false, title:'Greek Salad', likes:60, categories:[4]}],
            recipeExpanded: false,
            collectionExpanded: false,
        }
        this.props.history.push('/editprofile/'+ this.props.match.params.uid);
    }

    componentDidMount() {
        // requires server call to fetch user information and recipes user created
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
        // requires server call to update the information
        let new_recipes = this.state.recipes;
        this.state.recipes.forEach((recipe, idx)=>{
            if(recipe.id === rid){
                if(recipe.liked){
                    new_recipes[idx].liked = false;
                    new_recipes[idx].likes--;
                    this.setState({ recipes: new_recipes });
                }else{
                    new_recipes[idx].liked = true;
                    new_recipes[idx].likes--;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
    }

    clickStar=(rid)=>{
        // requires server call to update the information
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
        // requires server call to push the new profile picture 
        // and the new description into the server 
        this.props.history.push("/viewprofile/"+this.state.uid);
    }

    onClose=(e)=>{
        this.setState({preview: null})
    }
      
    onCrop=(e,preview)=>{
        this.setState({preview})
    }

    onChangePassword=(e)=>{
        e.preventDefault();
        this.setState({password: e.target.value});
    }

    onChangeDescription=(e)=>{
        e.preventDefault();
        this.setState({description: e.target.value});
    }

    enterKeyHandler(e){
        e.preventDefault();
        if (e.keyCode === 13){
            this.setState({description: this.state.description + '\n'});
        };
    }

    clickRecipe=(rid)=>{
        this.props.histor.push("/viewrecipe/"+rid);
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

    CollectionRecipeGenerator=()=>{
        if(this.state.recipeExpanded){
            return <div id="collection-recipeswithEx">
                <h4>My Collection
                {this.CollectionExpandButtonGenerator()}
                </h4>
                <Collapse in={this.state.collectionExpanded}>
                    <div className="recipe-list">
                        <RecipeList   
                            recipes={this.state.collectRecipes}
                            clickHeart={this.clickHeart}
                            clickStar={this.clickStar}
                            clickRecipe = {this.clickRecipe}
                            userid={this.state.curruid}
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
                                recipes={this.state.collectRecipes}
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
        const { history, app } = this.props;
        return(
            <div className="edit-profile">
            
            <Container maxWidth='md'>
                <Navbar app={app}/>
                
                <div id="user-profile">
                    <h4>{this.state.username + "'s Profile"}</h4>
                    <form onSubmit={this.editprofile}>
                        <div id="picture-change">
                            <Avatar 
                                width={200}
                                height={200} 
                                round={true} 
                                onCrop={this.onCrop}
                                onClose={this.onClose}
                                src={this.state.userpicture.src}
                            /> 
                        </div>    
                        <div className="form-group" id="profile-input">
                            <div>Change Password:</div>
                            <input type="password" className = "form-control" value={this.state.password} onChange={this.onChangePassword}/>
                            <div>Change Profile Description:</div>
                            <textarea className = "form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                            <button type="button"
                                    className = "btn btn-outline-primary"
                                    onClick={this.editprofile}>
                                <FaRegSave/>
                                Save Profile
                            </button>    
                        </div>  
                    </form>
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