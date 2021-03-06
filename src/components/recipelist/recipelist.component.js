import React, { Component } from 'react';
import "./recipelist.css";
import { uid } from "react-uid";
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
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
        maxWidth: 180,
        height: 350,
        borderRadius: 25,
    },
    title:{
        height: 80,
    },
    media: {
        height: 200,
    },
    likeButton:{
        paddingLeft: 20,
    },
    saveButton: {
        marginLeft: 10,
    },
  };

class ReceipeList extends Component {
    
    render(){
        const {classes, recipes, clickRecipe, clickHeart, clickStar, userid} = this.props;
        return(
            <div className="vertical-scrollable">
            {recipes.map( (recipe) => (
                <div key={uid(recipe.title)} className="recipe-container">
                        <Card className={classes.root}>
                        <CardActionArea onClick={()=>clickRecipe(userid,recipe.id)}>
                            <CardMedia
                            className={classes.media}
                            component="img"
                            alt={recipe.title}
                            image={recipe.src}
                            />
                            <CardContent className={classes.title}>
                            <Typography gutterBottom variant="h6" component="h6">
                                {recipe.title}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions disableSpacing>
                            <div className="like-class">
                                <FormControlLabel
                                labelPlacement="end"
                                className={classes.likeButton}
                                control={<Checkbox checked= {recipe.liked}disableRipple={true} onChange={()=>clickHeart(recipe.id)} icon={<FavoriteBorder/>} checkedIcon={<Favorite />} name="liked" />} 
                                label={recipe.likes}
                                />
                                <FormControlLabel
                                className={classes.saveButton}
                                control={<Checkbox disableRipple={true} onChange={()=>clickStar(recipe.id)} icon={<BookmarkBorderIcon/>} checkedIcon={<BookmarkIcon style={{color: yellow[600] }}/>} name="saved" />} 
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

export default withStyles(styles)(ReceipeList);