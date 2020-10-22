import React, { Component } from 'react';
import "./style.css"

export default class HomePageRightPanel extends Component {
    render(){
        const {top3_recipe} = this.props;
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
                        <td>{top3_recipe[0].title}</td>
                        <td>{top3_recipe[0].likes}</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{top3_recipe[1].title}</td>
                        <td>{top3_recipe[1].likes}</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>{top3_recipe[2].title}</td>
                        <td>{top3_recipe[2].likes}</td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}