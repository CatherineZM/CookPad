import React, { Component } from 'react';
import "./style.css";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { uid } from 'react-uid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';

export default class HomePageRightPanel extends Component {
    render(){
        const {top3_recipe, recipes, clickHeart, userid} = this.props;
        return(
            <div id="right-panel">
            <Table size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow>
                        <TableCell>Top Recipes</TableCell>
                        <TableCell  align="right">Likes</TableCell>
                    </TableRow>
                    {top3_recipe.map((recipe)=>(
                        <TableRow key={uid(recipes[recipe].title)}>
                            <TableCell><Link to={"/viewrecipe/"+userid+"/"+recipes[recipe].id}>{recipes[recipe].title}</Link></TableCell>
                            <TableCell>
                            
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