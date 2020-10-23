import React, { Component } from 'react';
import { uid } from "react-uid";
import "./style.css"


export default class HomePageLeftPanel extends Component {
    render(){
        const {clickCategory, categories, all_checked, clickAll} = this.props;
        return(
            <div id="left-panel">
            <table>
                <tbody>
                    {categories.map( (category) => (
                        <tr key={uid(category.text)}>
                            <td><img src={category.src} alt={category.text} width="50px" height="50px"/></td>
                            <td>{category.text}</td>
                            <td><input type="checkbox" name={category.id} onChange={clickCategory} checked={category.checked}/></td>
                        </tr> 
                    ))}
                    <tr>
                        <td></td>
                        <td>All</td>
                        <td><input type="checkbox" onChange={clickAll} checked={all_checked}/></td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}