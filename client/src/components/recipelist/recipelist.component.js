import React, { Component } from 'react';
import "./recipelist.css";
import { uid } from "react-uid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom'
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { yellow } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        width: 170,
        height: 260,
        borderRadius: 25,
    },
    title:{
        height: 35,
        padding: 5,
    },
    media: {
        height: 180,
    },
    likeButton:{
        paddingLeft: 15,
    },
    saveButton: {
        paddingLeft: 10,
    },
    action: {
        paddingTop: 0,
        paddingLeft: 12,
    },
  };

class RecipeList extends Component {
    
    render(){
        const {classes, recipes, clickRecipe, clickHeart, clickStar, app} = this.props;
        return(
            <div className="vertical-scrollable">
            {recipes.map( (recipe) => (
                <div key={uid(recipe._id)} className="recipe-container">
                        <Card className={classes.root}>
                        <CardActionArea onClick={()=>clickRecipe(recipe._id)}>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt={recipe.name}
                            image={recipe.imageUrl}
                            />
                            <CardContent className={classes.title}>
                            <Typography gutterBottom variant="h6" component="h6">
                                {recipe.name}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions disableSpacing className={classes.action}>
                            <div className="like-class">
                                <FormControlLabel
                                labelPlacement="end"
                                className={classes.likeButton}
                                control={<Checkbox checked={app.state.currentUser.likedRecipes && app.state.currentUser.likedRecipes.includes(recipe._id)} disableRipple={true} onChange={()=>clickHeart(recipe._id)} icon={<FavoriteBorder/>} checkedIcon={<Favorite />} name="liked" />} 
                                label={recipe.likes}
                                />
                                <FormControlLabel
                                className={classes.saveButton}
                                control={<Checkbox checked={app.state.currentUser.collectedRecipes && app.state.currentUser.collectedRecipes.includes(recipe._id)} disableRipple={true} onChange={()=>clickStar(recipe._id)} icon={<BookmarkBorderIcon/>} checkedIcon={<BookmarkIcon style={{color: yellow[600] }}/>} name="saved" />} 
                                /> 
                            </div>
                        </CardActions>
                    </Card>
                </div>   
            ))}
            </div>
        )   
    }
}

export default withRouter(withStyles(styles)(RecipeList));