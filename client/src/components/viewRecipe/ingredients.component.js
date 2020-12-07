import React, { Component } from 'react';
import './viewRecipe.css'
import { uid } from "react-uid";
import {Table, TableContainer, Paper, TableBody, TableRow, TableCell} from "@material-ui/core"

export default class Ingredients extends Component {
    render(){
        const {ingredients} = this.props;
        return(
            <div>
                <TableContainer component={Paper} className="recipe-ingredients">
                <Table size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Ingredients</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    {ingredients.map((ingredient)=>{
                    return(
                        <TableRow key={uid(ingredient.name)}>
                            <TableCell>{ingredient.name}</TableCell>
                            <TableCell>{ingredient.quantity}{"  "}{ingredient.unit}</TableCell>
                        </TableRow>
                    )
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        )
    }
}