import React, { Component } from 'react';
import Navbar from "../Navbar/navbar.component";
import { Link } from "react-router-dom"
import Container from "@material-ui/core/Container"
import Ingredients from "./ingredients.component"
import Steps from "./steps.component"
import {getRecipe, deleteRecipe} from "../../actions/recipe"
import './viewRecipe.css'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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

const styles = {
    card:{
        borderRadius: 20,
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
        // TODO: change it to the line commented
        this.props.history.push('/viewrecipe/5fc6d4eb6db5830cb4a1586d');
        //this.props.history.push('/viewrecipe/'+this.props.match.params.rid);
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
            }
        }
    }

    componentDidMount() {
        // TODO: change this ID to this.props.match.params.rid
        getRecipe(this, "5fc6d4eb6db5830cb4a1586d")
    }

    clickStar=(rid)=>{
        // // requires server calls to update the recipe information
        // let new_recipe = this.state.recipe;
        // if(this.state.recipe.collected){
        //     new_recipe.collected = false;
        //     this.setState({ recipes: new_recipe });
        // }else{
        //     new_recipe.collected = true;
        //     this.setState({ recipes: new_recipe });
        // }
    }

    clickHeart=(rid)=>{
        // requires server calls to update the recipe information
        // let new_recipe = this.state.recipe;
        // if(this.state.recipe.liked){
        //     new_recipe.liked = false;
        //     new_recipe.likes--;
        //     this.setState({ recipes: new_recipe });
        // }else{
        //     new_recipe.liked = true;
        //     new_recipe.likes++;
        //     this.setState({ recipes: new_recipe });
        // }
    }

    editRecipe=(e)=>{
        e.preventDefault();
        this.props.history.push("/editRecipe/" + this.state.recipe.id);
    }

    deleteRecipe=(e)=>{
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this item?')){
            // TODO: need to update the myRecipe list of user
            deleteRecipe(this.state.recipe._id)
            console.log("item deleted")
            //this.props.history.push("/viewprofile/"+ this.props.app.state.currentUser._id)
        } 
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

    render(){
        const {classes, app} = this.props;
        return(
            <div>
            <Container maxWidth="md">
                <Navbar app={app}/>
                <div className="recipe-des">
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt={this.state.recipe.name}
                            image={this.state.recipe.filePath}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h4" component="h4">
                            {this.state.recipe.name}
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
                                control={<Checkbox checked= {this.state.liked}disableRipple={true} onChange={()=>this.clickHeart(this.state.recipe._id)} icon={<FavoriteBorder fontSize="large"/>} checkedIcon={<Favorite fontSize="large"/>} name="liked" />} 
                                label={this.state.recipe.likes}
                                />
                                <FormControlLabel
                                className={classes.saveButton}
                                control={<Checkbox disableRipple={this.state.collected} onChange={()=>this.clickStar(this.state.recipe._id)} icon={<BookmarkBorderIcon fontSize="large"/>} checkedIcon={<BookmarkIcon fontSize="large" style={{color: yellow[600] }}/>} name="saved" />} 
                                /> 
                            </div>
                        </CardActions>
                    </Card>
                </div>
                
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