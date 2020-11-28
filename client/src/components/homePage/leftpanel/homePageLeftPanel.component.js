import React, { Component } from 'react';
import { uid } from "react-uid";
import "./style.css"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell';

export default class HomePageLeftPanel extends Component {
    render(){
        const {clickCategory, categories, all_checked, clickAll} = this.props;
        return(
            <div id="left-panel">
            <Table>
                <TableBody size="small" aria-label="a dense table">
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>All</TableCell>
                        <TableCell><input type="checkbox" onChange={clickAll} checked={all_checked}/></TableCell>
                    </TableRow>
                    {categories.map( (category) => (
                        <TableRow key={uid(category.text)}>
                            <TableCell><img src={category.src} alt={category.text}/></TableCell>
                            <TableCell>{category.text}</TableCell>
                            <TableCell><input type="checkbox" name={category.id} onChange={clickCategory} checked={category.checked}/></TableCell>
                        </TableRow> 
                    ))}
                </TableBody>
            </Table>
            </div>
        )
    }
}