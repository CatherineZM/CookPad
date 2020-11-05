import React, { Component } from 'react';
import {Link} from "react-router-dom"
import "./topRecipes.css";
import { uid } from 'react-uid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    card:{
        borderRadius: 20,
        width:260,
    },
  };

class TopRecipes extends Component {
    render(){
        const {classes, clickRecipe, recipes, top3_recipe, userid} = this.props;
        return(
            <div id="top-recipe">
                {top3_recipe.map((id)=>(
                    <div key={uid(recipes[id].title)} className="view-other">
                        <Link to={"/viewrecipe/"+ userid + "/" + recipes[id].id}>
                            <Card className={classes.card}>
                                <CardActionArea >
                                    <CardMedia
                                        height="200"
                                        component="img"
                                        alt={recipes[id].title}
                                        image={recipes[id].src}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="body" component="h6">
                                    {recipes[id].title}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}

export default withStyles(styles)(TopRecipes);