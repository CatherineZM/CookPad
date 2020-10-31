import React, { Component } from 'react';
import {Link} from "react-router-dom"
import "./style.css";
import { uid } from 'react-uid';

export default class TopRecipes extends Component {
    render(){
        const {recipes, top3_recipe, userid} = this.props;
        return(
            <div id="top-recipe">
                {top3_recipe.map((id)=>(
                    <div key={uid(recipes[id].title)}>
                        <Link to={"/viewrecipe/"+ userid + "/" + recipes[id].id}>
                        <img src={recipes[id].src} alt="" height="200px" width="260px"></img>
                        </Link>
                    <div>{recipes[id].title}</div>
                    </div>
                ))}
            </div>
        )
    }
}