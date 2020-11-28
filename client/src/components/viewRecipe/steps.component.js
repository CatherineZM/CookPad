import React, { Component } from 'react';
import './viewRecipe.css'
import { uid } from "react-uid";
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

export default class Steps extends Component {
    render(){
        const {steps} = this.props;
        return(
            <div className="steps">
                <Table className="recipe-steps" size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Steps</TableCell>
                        </TableRow>
                        {steps.map((step, id)=>{
                            return(
                                <TableRow key={uid(step)}>
                                    <TableCell>{id+1}</TableCell>
                                    <TableCell>{step}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}