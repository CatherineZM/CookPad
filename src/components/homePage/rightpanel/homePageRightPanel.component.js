import React, { Component } from 'react';
import "./style.css";
import {Link} from "react-router-dom";
import { FaHeart } from "react-icons/fa";

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
                    <tr>
                        <td>1</td>
                        <td><Link to={"/viewrecipe/"+ recipes[top3_recipe[0]].id}>{recipes[top3_recipe[0]].title}</Link></td>
                        <td>
                        {recipes[top3_recipe[0]].liked && <FaHeart className="likes" onClick={()=>clickHeart(top3_recipe[0])}/>}
                        {!recipes[top3_recipe[0]].liked && <FaHeart className="dislikes" onClick={()=>clickHeart(top3_recipe[0])}/>}
                        {recipes[top3_recipe[0]].likes}
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><Link to={"/viewrecipe/"+ recipes[top3_recipe[1]].id}>{recipes[top3_recipe[1]].title}</Link></td>
                        <td>
                        {recipes[top3_recipe[1]].liked && <FaHeart className="likes" onClick={()=>clickHeart(top3_recipe[1])}/>}
                        {!recipes[top3_recipe[1]].liked && <FaHeart className="dislikes" onClick={()=>clickHeart(top3_recipe[1])}/>}
                        {recipes[top3_recipe[1]].likes}
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td><Link to={"/viewrecipe/"+ recipes[top3_recipe[2]].id}>{recipes[top3_recipe[2]].title}</Link></td>
                        <td>
                        {recipes[top3_recipe[2]].liked && <FaHeart className="likes" onClick={()=>clickHeart(top3_recipe[2])}/>}
                        {!recipes[top3_recipe[2]].liked && <FaHeart className="dislikes" onClick={()=>clickHeart(top3_recipe[2])}/>}
                        {recipes[top3_recipe[2]].likes}
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}