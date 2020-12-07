import React, { Component } from 'react';
import './viewRecipe.css'
import { uid } from "react-uid";
import {Table, TableBody, TableRow, TableCell, TableContainer, Paper} from "@material-ui/core"

export default class Steps extends Component {
    render(){
        const {steps} = this.props;
        return(
            <div className="steps">
                <TableContainer component={Paper} className="recipe-steps" >
                <Table size="small" aria-label="a dense table">
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
                </TableContainer>
            </div>
        )
    }
}