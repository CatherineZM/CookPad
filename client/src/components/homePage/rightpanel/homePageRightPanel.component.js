import React, { Component } from 'react';
import "./homePageRightPanel.css";
import { Link } from "react-router-dom";
import { uid } from 'react-uid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
    cell:{
        borderTop: "solid",
        borderTopWidth: 1,
        borderColor: grey[300], 
        borderBottom: "none"
    },
  };

class HomePageRightPanel extends Component {
    render(){
        const {classes, top3_recipe, recipes, app, clickHeart} = this.props;
        return(
            <div id="top-3-recipe">
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow id="table-row">
                        <TableCell className="name">Top Recipes</TableCell>
                        <TableCell className="likes-count" align="left">Likes</TableCell>
                    </TableRow>
                    {top3_recipe.map((recipe)=>(
                        <TableRow id="table-row" key={uid(recipes[recipe].name)}>
                            <TableCell className={classes.cell} id="recipe-name">
                                <Link to={"/viewrecipe/"+recipes[recipe]._id}>{recipes[recipe].name}</Link>
                            </TableCell>
                            <TableCell className={classes.cell} id="recipe-likes">
                                <FormControlLabel
                                labelPlacement="end"
                                className={classes.likeButton}
                                control={<Checkbox checked={app.state.currentUser.likedRecipes && app.state.currentUser.likedRecipes.includes(recipes[recipe]._id)} disableRipple={true} onChange={()=>clickHeart(recipes[recipe]._id)} icon={<FavoriteBorder/>} checkedIcon={<Favorite />} name="liked" />} 
                                label={recipes[recipe].likes}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        )
    }
}

export default withStyles(styles)(HomePageRightPanel);