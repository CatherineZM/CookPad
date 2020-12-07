import React, { Component } from 'react';
import Navbar from "../Navbar/navbar.component";
import { Link } from "react-router-dom"
import {Container} from "@material-ui/core"
import Ingredients from "./ingredients.component"
import Steps from "./steps.component"
import {getRecipe, deleteRecipe, setRecipe, getTop2Recipes, DeleteFromRecipeList, addToRecipeList} from "../../actions/recipe"
import {uid} from "react-uid"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { yellow } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

import './viewRecipe.css'

const styles = {
    card:{
        borderRadius: 20,
    },
    media:{
        width: 600,
        height: 400,
    },
    likeButton:{
        paddingLeft: 40,
    },
    saveButton: {
        marginLeft: 385,
    },
  };

class ViewRecipe extends Component {
    constructor(props){
        super(props);
        this.props.history.push('/viewrecipe/'+this.props.match.params.rid);
        // requires server calls to update the information based on the recipe id
        this.state = {
            liked: false,
            collected: false,
            recipe:{
                _id: 0,
                name: "",
                description: "",
                likes: 0,
                categories: [],
                creatorUsername: "",
                creatorId: "",
                steps: [],
                ingredients: [{name:"", quantity:"", unit: ""}],
                filePath: "",
            },
            top2_recipes:[],
            dummy: 0,
        }
        getRecipe(this, this.props.match.params.rid)
        // no duplicate with the current rid
        getTop2Recipes(this, this.props.match.params.rid);
    }


    clickStar=(rid)=>{
        if(this.props.app.state.currentUser.collectedRecipes.includes(rid)){
            this.props.app.state.currentUser.collectedRecipes = this.props.app.state.currentUser.collectedRecipes.filter(recipe=> recipe !== rid)
            DeleteFromRecipeList(this.props.app.state.currentUser._id, {collectedRecipes: rid})
            this.setState({collected: false})
        }else{
            this.props.app.state.currentUser.collectedRecipes.push(rid)
            addToRecipeList(this.props.app.state.currentUser._id, {collectedRecipes: rid})
            this.setState({collected: true})
        }
    }

    clickHeart=(rid)=>{
        let newRecipe = this.state.recipe;
        if(this.props.app.state.currentUser.likedRecipes.includes(rid)){
            this.props.app.state.currentUser.likedRecipes = this.props.app.state.currentUser.likedRecipes.filter(recipe=> recipe !== rid)
            DeleteFromRecipeList(this.props.app.state.currentUser._id, {likedRecipes: rid})
            newRecipe.likes--;
            this.setState({ likes: newRecipe });
        }else{
            this.props.app.state.currentUser.likedRecipes.push(rid)
            addToRecipeList(this.props.app.state.currentUser._id, {likedRecipes: rid})
            newRecipe.likes++;
            this.setState({ recipes: newRecipe });
        }
        setRecipe(rid, {likes: newRecipe.likes})
    }

    editRecipe=(e)=>{
        e.preventDefault();
        this.props.history.push("/editRecipe/" + this.state.recipe._id);
    }

    deleteRecipe=(e)=>{
        e.preventDefault();
        swal({title: "Are you sure?", text:"Once deleted, you will not be able to recover this recipe", icon:"warning",buttons: ["Cancel", "Delete"]})
        .then((confirmDelete)=>{
            if(confirmDelete){
                deleteRecipe(this.state.recipe._id, this)
                swal({title:"Poof! Your recipe is gone!", icon:"success"})
            }else{
                swal({title:"Your recipe is still here!"})
            }
        })
    }

    editDeleteButtonGen=()=>{
        if(this.state.recipe.creatorId === this.props.app.state.currentUser._id){
            return (
            <div>
            <div className="view-recipe-form-group">
                <form float="left" onSubmit={this.editRecipe}><input type="submit" value="Edit" className="btn btn-primary"/></form>
            </div>
            <div className="view-recipe-form-group">
                <form onSubmit={this.deleteRecipe}><input type="submit" value="Delete" className="btn btn-primary"/></form>
            </div>
            </div>);
        } else {
            return null;
        }

    }
    
    refresh=(rid)=>{
        getRecipe(this, rid)
        getTop2Recipes(this, rid);
    }

    recommendationGen

    render(){
        const {classes, app} = this.props;
        return(
            <div>
            <Container maxWidth='md'>
                <Navbar app={app}/>
                <div className="recipe-des">
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.media}
                            component="img"
                            alt={this.state.recipe.name}
                            image={this.state.recipe.imageUrl}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h4" component="h4">
                            {this.state.recipe.name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h5">
                            {this.state.recipe.description}
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="h6">
                            <Link to={"/viewprofile/"+ this.state.recipe.creatorId}>{"By: "+this.state.recipe.creatorUsername}</Link>
                        </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <div className="like-class">
                                <FormControlLabel
                                className={classes.likeButton}
                                labelPlacement="end"
                                control={<Checkbox checked={this.props.app.state.currentUser.likedRecipes && this.props.app.state.currentUser.likedRecipes.includes(this.state.recipe._id)} disableRipple={true} onChange={()=>this.clickHeart(this.state.recipe._id)} icon={<FavoriteBorder fontSize="large"/>} checkedIcon={<Favorite fontSize="large"/>} name="liked" />} 
                                label={this.state.recipe.likes}
                                />
                                <FormControlLabel
                                className={classes.saveButton}
                                control={<Checkbox checked={this.props.app.state.currentUser.collectedRecipes && this.props.app.state.currentUser.collectedRecipes.includes(this.state.recipe._id)} disableRipple={true} onChange={()=>this.clickStar(this.state.recipe._id)} icon={<BookmarkBorderIcon fontSize="large"/>} checkedIcon={<BookmarkIcon fontSize="large" style={{color: yellow[600] }}/>} name="saved" />} 
                                /> 
                            </div>
                        </CardActions>
                    </Card>
                </div>
                
                {this.state.top2_recipes && this.state.top2_recipes.length === 2 && this.state.top2_recipes[0] && this.state.top2_recipes[1] &&
                <div className="recommendations">
                    <h4>Recommendations</h4>
                {this.state.top2_recipes.map((recipe)=>(
                    <div key={uid(recipe._id)} className="view-other">
                        <Link to={"/viewrecipe/" + recipe._id} onClick={()=>this.refresh(recipe._id)}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    height="170"
                                    component="img"
                                    alt={recipe.name}
                                    image={recipe.imageUrl}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="h6">
                                    {recipe.name}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        </Link>
                    </div>
                    ))}
                </div>}
                
                <div className="mid-section">
                    <Steps
                        steps={this.state.recipe.steps}
                    />

                    <Ingredients
                        ingredients={this.state.recipe.ingredients}
                    />
                </div>

                <this.editDeleteButtonGen/>
            </Container> 
            </div> 
        )
    }
} 

export default withStyles(styles)(ViewRecipe);