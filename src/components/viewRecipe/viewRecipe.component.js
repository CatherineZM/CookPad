import React, { Component } from 'react';
import Navbar from "../Navbar/navbar.component";
import { Link } from "react-router-dom"
import Container from "@material-ui/core/Container"
import Ingredients from "./ingredients.component"
import Steps from "./steps.component"
import {uid} from "react-uid"
import './viewRecipe.css'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
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
// hardcoded images
import recipe1 from '../../recipes/butter-chicken.jpg'
import recipe2 from '../../recipes/lemon-zucchini-bread.jpg'
import recipe3 from '../../recipes/ramen.jpg'

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
        // the current recipe will be fetch from database
        this.state = {
            uid: this.props.match.params.uid,
            rid: this.props.match.params.rid,
            top3_recipe:[
                {id:1, src:recipe2, liked: false, collected: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
                {id:2, src:recipe3, liked: false, collected: false, title:'Ramen', likes:98, categories:[1]}
            ],
            recipe: {id:0, src:recipe1, liked: false, title:'Butter Chicken', likes: 123, categories:[7], collected: false,
            creator:{uid:127, username:"Raon"}, 
            ingredients: [
                {ingredient:"Butter", measure:"2 tablespoons"},
                {ingredient:"Medium onion", measure:"1 (medium diced)"},
                {ingredient:"Red pepper", measure:"1 (small dice)"},
                {ingredient:"Garlic cloves", measure:"3 (minced)"},
                {ingredient:"Grated ginger", measure:"1 tablespoon"},
                {ingredient:"Garam masala", measure:"1 teaspoon"},
                {ingredient:"Cumin", measure:"1 teaspoon"},
                {ingredient:"Red chili powder", measure:"1 teaspoon"},
                {ingredient:"Diced tomatoes", measure:"14 ounces"},
                {ingredient:"Heavy cream", measure:"1 cup"},
                {ingredient:"Salt and pepper", measure:"To taste"}
            ], 
            steps: [
                "Heat a large pan to medium high heat and add the olive oil. Add the chicken and cook for 5 minutes, stirring, until the chicken is browned. Remove the chicken and set it aside.", 
                "Melt the butter in the same pan. Add the onion and peppers and cook them 5 minutes to soften.",
                "Add the garlic and ginger and cook 1 minute, until they become fragrant.",
                "Add the garam masala, cumin, red chili powder, salt and pepper. Stir and cook for 1 minute.",
                "Stir in the diced tomatoes. Bring to a quick boil, then reduce the heat and simmer for 15 minutes to break everything down.",
                "Transfer the sauce to a blender or food processor and process until smooth. You can thin it out with a bit of water if you’d like.",
                "Strain the sauce back into the pan. The point is to make the sauce very smooth and heat through.",
                "Stir in the cream and add the chicken back to the pan. Heat and simmer for 10 minutes, or until the chicken is cooked through and the sauce thickens up a bit.",
                "Serve with cooked white rice and enjoy!"
            ]
        }
        }
    }

    componentDidMount() {
        // the current recipe will be fetch from database
    }

    clickStar=(rid)=>{
        // need to update the information into database
        let new_recipe = this.state.recipe;
        if(this.state.recipe.collected){
            new_recipe.collected = false;
            this.setState({ recipes: new_recipe });
        }else{
            new_recipe.collected = true;
            this.setState({ recipes: new_recipe });
        }
    }

    clickHeart=(rid)=>{
        // need to update the information into database
        let new_recipe = this.state.recipe;
        if(this.state.recipe.liked){
            new_recipe.liked = false;
            new_recipe.likes--;
            this.setState({ recipes: new_recipe });
        }else{
            new_recipe.liked = true;
            new_recipe.likes++;
            this.setState({ recipes: new_recipe });
        }
    }

    editRecipe=(e)=>{
        e.preventDefault();
        window.location = "/editRecipe/" + this.state.uid + "/" + this.state.recipe.id
    }

    deleteRecipe=(e)=>{
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this item?')){
            // delete item in database
            console.log("item deleted")
            window.location = "/myrecipes/" + this.state.uid
        } 
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
            <Container maxWidth="md">
                <Navbar uid={this.state.uid}/>
                <div className="recipe-des">
                    <Card className={classes.card}>
                        <CardMedia
                            component="img"
                            alt={this.state.recipe.title}
                            image={this.state.recipe.src}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="body" component="h4">
                            {this.state.recipe.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Link to={"/viewprofile/"+ this.state.recipe.creator.uid+ "/" + this.state.uid}>{"By: "+this.state.recipe.creator.username}</Link>
                        </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <div className="like-class">
                                <FormControlLabel
                                className={classes.likeButton}
                                labelPlacement="end"
                                control={<Checkbox disableRipple={true} onChange={()=>this.clickHeart(this.state.recipe.id)} icon={<FavoriteBorder fontSize="large"/>} checkedIcon={<Favorite fontSize="large"/>} name="liked" />} 
                                label={this.state.recipe.likes}
                                />
                                <FormControlLabel
                                className={classes.saveButton}
                                control={<Checkbox disableRipple={true} onChange={()=>this.clickStar(this.state.recipe.id)} icon={<BookmarkBorderIcon fontSize="large"/>} checkedIcon={<BookmarkIcon fontSize="large" style={{color: yellow[600] }}/>} name="saved" />} 
                                /> 
                            </div>
                        </CardActions>
                    </Card>
                </div>

                <div className="recommendations">
                {this.state.top3_recipe.map((recipe)=>(
                    <div key={uid(recipe.title)} className="view-other">
                        <Card className={classes.card}>
                            <CardActionArea>
                                <Link to={"/viewrecipe/"+ this.state.uid + "/" + recipe.id}/>
                                <CardMedia
                                    height="200"
                                    component="img"
                                    alt={recipe.title}
                                    image={recipe.src}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="body" component="h6">
                                    {recipe.title}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </div>
                    ))}
                </div>
                
                <div className="mid-section">
                    <Steps
                        steps={this.state.recipe.steps}
                    />

                    <Ingredients
                        ingredients={this.state.recipe.ingredients}
                    />
                </div>

                {/* only show the two button if they belong to the user */}
                <div>
                    <div className="view-recipe-form-group">
                        <form float="left" onSubmit={this.editRecipe}><input type="submit" value="Edit" className="btn btn-primary"/></form>
                    </div>
                    <div className="view-recipe-form-group">
                        <form onSubmit={this.deleteRecipe}><input type="submit" value="Delete" className="btn btn-primary"/></form>
                    </div>
                </div>
            </Container> 
            </div> 
        )
    }
} 

export default withStyles(styles)(ViewRecipe);