import React, { Component } from 'react';
import './viewRecipe.css'
import { uid } from "react-uid";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

export default class Ingredients extends Component {
    render(){
        const {ingredients} = this.props;
        return(
            <div>
                <Table className="recipe-ingredients" size="small" aria-label="a dense table">
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
            </div>
        )
    }
}