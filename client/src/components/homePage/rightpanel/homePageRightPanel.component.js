import React, { Component } from 'react';
import "./homePageRightPanel.css";
import { Link } from "react-router-dom";
import { uid } from 'react-uid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { grey } from '@material-ui/core/colors';

import { withStyles } from '@material-ui/core/styles';

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
        const {classes, top3_recipe, recipes} = this.props;
        return(
            <div id="right-panel">
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
                                {recipes[recipe].likes}
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