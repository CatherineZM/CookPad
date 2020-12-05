import React, { Component } from 'react';
import {Container, AppBar, Tabs, Tab, Box} from "@material-ui/core"
import './viewProfile.css'
import Navbar from "../Navbar/navbar.component"
import RecipeList from '../recipelist/recipelist.component'
import Avatar from 'react-avatar-edit';
import {Collapse} from 'react-bootstrap'
import {DeleteFromRecipeList, addToRecipeList} from '../../actions/recipe';
import {setRecipe} from '../../actions/recipe'

// hard coded images
import defaultPic from'./default-profile-pic.png' 
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import {getUser, updateUser} from "../../actions/user";
import {getMyRecipe, getMyCollection} from "../../actions/recipe";
import swal from 'sweetalert';

export default class ViewProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            user: {},
            profilePic: null,
            recipes: [],
            collectedRecipes:[],
            newPassword: null,
            recipeExpanded: false,
            collectionExpanded: false,
            inEdit:false,
            preview:null,
            currTab:-1,
        }
        this.props.history.push('/viewprofile/'+this.props.match.params.uid);
        getUser(this, ()=>{
            getMyRecipe(this);
            getMyCollection(this);
        })
        console.log(this.state.collectedRecipes)
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

    clickStar=async(rid)=>{
        if(this.props.app.state.currentUser.collectedRecipes.includes(rid)){
            this.props.app.state.currentUser.collectedRecipes = this.props.app.state.currentUser.collectedRecipes.filter(recipe=> recipe !== rid)
            await DeleteFromRecipeList(this.props.app.state.currentUser._id, {collectedRecipes: rid})
        }else{
            this.props.app.state.currentUser.collectedRecipes.push(rid)
            await addToRecipeList(this.props.app.state.currentUser._id, {collectedRecipes: rid})
        }

        let new_collectedRecipes = [];
        let added_id = [];
        this.state.collectedRecipes.forEach((recipe)=>{
            const new_recipe = Object.create(recipe)
            if(this.props.app.state.currentUser.collectedRecipes.includes(new_recipe._id)){
                added_id.push(new_recipe._id)
                new_collectedRecipes.push(new_recipe)
            }
        })
        this.state.recipes.forEach((recipe)=>{
            const new_recipe = Object.create(recipe)
            if(this.props.app.state.currentUser.collectedRecipes.includes(new_recipe._id) && !added_id.includes(new_recipe._id)){
                new_collectedRecipes.push(new_recipe)
            }
        })
        this.setState({ collectedRecipes: new_collectedRecipes });
    }

    onClose=()=>{
        this.setState({profilePic: null})
    }
      
    onCrop=(preview)=>{
        const img = new Blob([preview], {type: "image/png"})
        this.setState({profilePic: img})
        console.log(this.state.profilePic)
    }

    onImageLoad=(img)=>{
        this.setState({profilePic: img});
        console.log(img)
    }

    onChangePassword=(e)=>{
        e.preventDefault();
        this.setState({newPassword: e.target.value})
    }

    onChangeDescription=(e)=>{
        e.preventDefault();
        const newUser = this.state.user
        newUser.description = e.target.value
        this.setState({user: newUser})
    }

    enterKeyHandler(e){
        e.preventDefault();
        if (e.keyCode === 13){
            this.setState({description: e.target.value + '\n'})
        };
    }

    editProfile=(e)=>{
        e.preventDefault();
        this.setState({inEdit: true})
    }

    saveProfile=(e)=>{
        e.preventDefault();
        const updateInfo = {
            description: this.state.user.description,
            profilePic: this.state.profilePic
        }
        
        if (this.state.newPassword !== null && this.state.newPassword !== ""){
            if (this.state.newPassword.length < 4){
                swal({title:"Oops!", text:"Password needs a minimum length of 4", icon:"warning"})
                return
            } else{
                updateInfo.password = this.state.newPassword
                this.setState({password: this.state.newPassword})
                this.setState({newPassword: null})
            }
        }
        
        console.log(updateInfo)
        updateUser(this, updateInfo, (comp)=>{
            comp.setState({inEdit:false})
        }) 
    }

    editButtonGenerator=(app)=>{
        if (app.state.currentUser._id === this.state.user._id){
            return <button type="button"
            className = "btn btn-outline-primary"
            onClick={this.editProfile}>
            <FaRegEdit/>
            {"  Edit Profile"}
            </button>
        }
        
    }

    profileGenerator = (app)=>{
        if (!this.state.inEdit){
            return  <div id="user-profile">
                        <h4>{this.state.user.username + "'s Profile"}</h4>
                        <div id="profile-pic">
                            <img alt={this.state.user.imageUrl} src={this.state.user.imageUrl ? this.state.user.imageUrl : defaultPic}
                                style={{width:"inherit",  height:"inherit"}}/> 
                        </div>
                        <div id="user-description">{this.state.user.description}</div>
                        {this.editButtonGenerator(app)}
                    </div>
        } else {
            return  <div id="user-profile">
                        <h4>{this.state.user.username + "'s Profile"}</h4>
                        <form className="signup-form" onSubmit={this.saveProfile}>
                            <div className="form-group" id="change-pic">
                                <Avatar 
                                    width={250}
                                    height={250} 
                                    round={true}
                                    label={"Change profile picture"}
                                    onFileLoad={this.onImageLoad}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose}
                                /> 
                            </div>    
                            <div className="form-group" id="profile-input">
                                <div className="form-group">
                                    <label> New Password: </label>
                                    <input type="password" className = "form-control" onChange={this.onChangePassword}/>
                                </div>
                                <div className="form-group">
                                    <label>Edit your Description: </label>
                                    <textarea className = "form-control" value={this.state.user.description} onChange={this.onChangeDescription}/>
                                </div>
                                <button type="button"
                                        className = "btn btn-outline-primary save-button"
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
                    Close 
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
                    Close 
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

    TabPanel = (props) => {
        const { children, value, index, ...other } = props;
        return (
          <div {...other}>
            {value === index && <Box p={3}>{children}</Box>}
          </div>
        );
    }

    handleTab = (event, newTab) => {
        this.setState({currTab: newTab});
    };

    render(){
        const { app } = this.props;
        return(
            <div>
            <Container maxWidth='md'>
                <Navbar app={app}/>
                {this.profileGenerator(app)}
                
                <div id="recipe-div">
                    <AppBar position="static">
                        <Tabs value={this.state.currTab} onChange={this.handleTab}>
                        <Tab label="My Recipes" />
                        <Tab label="My Collection" />
                        </Tabs>
                    </AppBar>
                    <this.TabPanel value={this.state.currTab} index={0}>
                        <RecipeList   
                            recipes={this.state.recipes}
                            clickHeart={this.clickHeart}
                            clickStar={this.clickStar}
                            clickRecipe = {this.clickRecipe}
                            app={app}
                        />
                    </this.TabPanel>
                    <this.TabPanel value={this.state.currTab} index={1}>

                        <RecipeList   
                            recipes={this.state.collectedRecipes}
                            clickHeart={this.clickHeart}
                            clickStar={this.clickStar}
                            clickRecipe = {this.clickRecipe}
                            app={app}
                        />
                    </this.TabPanel>
            

                    {/* <div className="recipes-collaps">
                        <h4>{app.state.currentUser._id === this.state.user._id ? "My Recipes" : `${this.state.user.username}'s Recipes`}
                        <this.RecipeExpandButtonGenerator/>
                        </h4>
                        <Collapse in={this.state.recipeExpanded}>
                            <div className="recipe-list">
                                    
                            </div>
                        </Collapse>
                    </div>

                    <div className="recipes-collaps">
                        <h4>{app.state.currentUser._id === this.state.user._id ? "My Collection" : `${this.state.user.username}'s Collection`}
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
                    </div> */}

                </div>
                
            </Container>
            </div> 
        )
    }
} 