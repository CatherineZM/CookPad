import React, { Component } from 'react';
import MyRecipes from './myRecipes.component'
import {Link} from 'react-router-dom';


export default class User extends Component {
    constructor(props){
        super(props);

        this.state = {
            username : this.props.user.username,


        }
    }

    render() {
        return(
            <tr class="user_row" key={this.state.username}>
                <td className = "username">
                    {this.state.username}
                </td>
                <td className = "recipeLink">
                    <Link to="/myrecipes/:uid"> View Recipes </Link>
                </td>
                <td className = "banButton">
                    <button onClick={()=>{}}> Ban </button>
                </td>


    
            </tr>

        )
    }
}