import React, { Component } from 'react';
import "./style.css";
import {Link} from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { uid } from 'react-uid';

export default class HomePageRightPanel extends Component {
    render(){
        const {top3_recipe, recipes, clickHeart} = this.props;
        return(
            <div id="right-panel">
            <table>
                <tbody>
                    <tr>
                        <td></td>
                        <td>Top 3 Recipes</td>
                        <td>Likes</td>
                    </tr>
                    {top3_recipe.map((recipe, idx)=>(
                        <tr key={uid(recipes[recipe].title)}>
                            <td>{idx+1}</td>
                            <td><Link to={"/viewrecipe/"+ recipes[recipe].id}>{recipes[recipe].title}</Link></td>
                            <td>
                            {recipes[recipe].liked && <FaHeart className="likes" onClick={()=>clickHeart(recipe)}/>}
                            {!recipes[recipe].liked && <FaHeart className="dislikes" onClick={()=>clickHeart(recipe)}/>}
                            {recipes[recipe].likes}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        )
    }
}