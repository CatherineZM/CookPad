import React, { Component } from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { uid } from 'react-uid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';

export default class HomePageRightPanel extends Component {
    render(){
        const {top3_recipe, recipes, clickHeart, userid} = this.props;
        return(
            <div id="right-panel">
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow id="table-row">
                        <TableCell className="name">Top Recipes</TableCell>
                        <TableCell  className="likes-count" align="center">Likes</TableCell>
                    </TableRow>
                    {top3_recipe.map((recipe)=>(
                        <TableRow id="table-row" key={uid(recipes[recipe].title)}>
                            <TableCell className="recipe-name"><Link to={"/viewrecipe/"+userid+"/"+recipes[recipe].id}>{recipes[recipe].title}</Link></TableCell>
                            <TableCell className="recipe-likes">
                            
                            {recipes[recipe].liked && <FaHeart className="likes" onClick={()=>clickHeart(recipe)}/>}
                            {!recipes[recipe].liked && <FaHeart className="dislikes" onClick={()=>clickHeart(recipe)}/>}
                            <span>{recipes[recipe].likes}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        )
    }
}