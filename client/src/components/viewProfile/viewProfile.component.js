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
import { FaRegEdit, FaRegSave } from "react-icons/fa";
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
            inEdit:false
        }
        this.props.history.push('/viewprofile/'+this.props.match.params.uid);
        
        console.log(this.state.collectedRecipes)
    }


    componentDidMount() {
        getUser(this, ()=>{
            getMyRecipe(this);
            getMyCollection(this);
        })
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

    onClose=(e)=>{
        this.setState({preview: null})
    }
      
    onCrop=(e,preview)=>{
        this.setState({preview})
    }

    onChangePassword=(e)=>{
        e.preventDefault();
        this.state.user.password = e.target.value
    }

    onChangeDescription=(e)=>{
        e.preventDefault();
        this.state.user.description = e.target.value
    }

    enterKeyHandler(e){
        e.preventDefault();
        if (e.keyCode === 13){
            this.state.user.description = e.target.value + '\n'
        };
    }

    editProfile=(e)=>{
        e.preventDefault();
        // this.props.history.push("/editprofile/"+ this.state.uid);
        this.setState({inEdit: true})
    }

    saveProfile=(e)=>{
        e.preventDefault();
        this.setState({inEdit: false})

    }

    editButtonGenerator=(app)=>{
        if (app.state.currentUser._id === this.state.user._id){
            return <button type="button"
            className = "btn btn-outline-primary"
            onClick={this.editProfile}>
            <FaRegEdit/>
            Edit Profile
            </button>
        }
        
    }

    profileGenerator = (app)=>{
        if (!this.state.inEdit){
            return  <div id="user-profile">
                        <h4>{this.state.user.username + "'s Profile"}</h4>
                        <Avatar id="user-picture" name="user" size="150" round={true} src={this.state.userpicture.src}/> 
                        <div id="user-description">{this.state.user.description}</div>
                        {this.editButtonGenerator(app)}
                    </div>
        } else {
            return  <div id="user-profile">
                        <h4>{this.state.user.username + "'s Profile"}</h4>
                        <form onSubmit={this.saveProfile}>
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
                                <input type="password" className = "form-control" onChange={this.onChangePassword}/>
                                <div>Change Profile Description:</div>
                                <textarea className = "form-control" value={this.state.user.description} onChange={this.onChangeDescription}/>
                                <button type="button"
                                        className = "btn btn-outline-primary"
                                        onClick={this.saveProfile}>
                                    <FaRegSave/>
                                    Save Profile
                                </button>    
                            </div>  
                        </form>
                    </div>
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
                {this.profileGenerator(app)}
                
                
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