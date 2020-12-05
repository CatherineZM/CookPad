import React, { Component } from 'react';
import {Link} from "react-router-dom"
import "./topRecipes.css";
import { uid } from 'react-uid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    card:{
        borderRadius: 20,
        width:250,
    },
  };

class TopRecipes extends Component {
    render(){
        const {classes, recipes, top3_recipe} = this.props;
        return(
            <div id="top-recipe">
                {top3_recipe.map((id)=>(
                    <div key={uid(recipes[id].name)} className="view-other">
                        <Link to={"/viewrecipe/"+ recipes[id]._id}>
                            <Card className={classes.card}>
                                <CardActionArea >
                                    <CardMedia
                                        height="200"
                                        component="img"
                                        alt={recipes[id].name}
                                        image={recipes[id].imageUrl}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h6" component="h6">
                                    {recipes[id].name}
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