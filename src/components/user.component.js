import React, { Component } from 'react';
import MyRecipes from './myRecipes/myRecipes.component'
import {Link} from 'react-router-dom';


export default class User extends Component {
    constructor(props){
        super(props);

        this.state = {
            username : this.props.user.username,
            uid : this.props.user.id
 

        }
    }

    render() {
        return(
            <tr class="user_row" key={this.state.username}>
                <td className = "username">
                    {this.state.username}
                </td>
                <td className = "recipeLink">
                    <Link to = {`/myrecipes/${this.state.uid}`}> View Recipes </Link>
                </td>
                <td className = "banButton">
                    <button onClick={()=>{}}> Ban </button>
                </td>


    
            </tr>

        )
    }
}
