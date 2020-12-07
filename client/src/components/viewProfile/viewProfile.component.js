import React, { Component } from 'react';
import {Container, AppBar, Tabs, Tab, Box} from "@material-ui/core"
import './viewProfile.css'
import Navbar from "../Navbar/navbar.component"
import RecipeList from '../recipelist/recipelist.component'
import Avatar from 'react-avatar-edit';
import {DeleteFromRecipeList, addToRecipeList} from '../../actions/recipe';
import {setRecipe} from '../../actions/recipe'
import { withStyles } from '@material-ui/core/styles';

// hard coded images
import defaultPic from'./default-profile-pic.png' 
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import {getUser, updateUser} from "../../actions/user";
import {getMyRecipe, getMyCollection} from "../../actions/recipe";
import swal from 'sweetalert';

const styles = {
    panel: {
        backgroundColor: "white",
        marginTop: 20,
        borderRadius:10,
        transition: "ease"
    },
    scrollButtons: {
        color: "black",
        backgroundColor: "darkgray"
    },

    indicator: {
        backgroundColor: "black"
    },

    bar: {
        flexGrow: 1,
        backgroundColor: "white",
        borderRadius: 10,

    },

    flexContainer: {
        color: "darkgray",
        borderRadius: 20,
    },
    tab: {
        color: "black",
        textTransform: "none",
        fontSize: '20px'
    }

}
class ViewProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            user: {},
            profilePic: null,
            recipes: [],
            collectedRecipes:[],
            newPassword: null,
            inEdit:false,
            preview:null,
            currTab:-1,
        }
        getUser(this, ()=>{
            getMyRecipe(this);
            getMyCollection(this);
        })
        console.log(this.state.collectedRecipes)
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.match.params.uid != this.props.match.params.uid){
            this.setState({uid: this.props.match.params.uid})
            
            getUser(this, ()=>{
                getMyRecipe(this);
                getMyCollection(this);
            })
            console.log(this.state)
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
                                    width={280}
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
        const { app, classes} = this.props;
        return(
            <div>
            <Container maxWidth='md'>
                <Navbar app={app}/>
                {this.profileGenerator(app)}
                
                <div id="recipe-div">
                    <AppBar position="static" className={classes.bar} color="white">
                        <Tabs value={this.state.currTab} onChange={this.handleTab} variant="fullWidth" classes={{
                                                                                                indicator: classes.indicator, 
                                                                                                flexContainer: classes.flexContainer}}>
                        <Tab label={app.state.currentUser._id == this.state.uid ? "My Recipe" : `${this.state.user.username}'s Recipe`} className={classes.tab}/>
                        <Tab label={app.state.currentUser._id == this.state.uid ? "My Collection" : `${this.state.user.username}'s Collection`} className={classes.tab}/>
                        </Tabs>
                    </AppBar>
                    <this.TabPanel className={classes.panel} value={this.state.currTab} index={0}>
                        <RecipeList   
                            recipes={this.state.recipes}
                            clickHeart={this.clickHeart}
                            clickStar={this.clickStar}
                            clickRecipe = {this.clickRecipe}
                            app={app}
                        />
                    </this.TabPanel>
                    <this.TabPanel className={classes.panel} value={this.state.currTab} index={1}>
                        <RecipeList   
                            recipes={this.state.collectedRecipes}
                            clickHeart={this.clickHeart}
                            clickStar={this.clickStar}
                            clickRecipe = {this.clickRecipe}
                            app={app}
                        />
                    </this.TabPanel>
                </div>
                
            </Container>
            </div> 
        )
    }
} 


export default withStyles(styles)(ViewProfile);