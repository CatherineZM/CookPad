import React, { Component } from 'react';
import "./style.css"
import cakeIcon from '../../images/cake.png'
import pieIcon from '../../images/pie.png'
import pizzaIcon from '../../images/pizza.png'
import saladIcon from '../../images/salad.png'
import sandwichIcon from '../../images/sandwich.png'
import seafoodIcon from '../../images/seafood.png'
import soupIcon from '../../images/soup.png'
import noodlesIcon from '../../images/noodles.png'

export default class HomePageLeftPanel extends Component {
    render(){
        return(
            <div id="left-panel">
            <table>
                <tbody>
                    <tr>
                        <td><img src={cakeIcon} alt="cake" width="50px" height="50px"/></td>
                        <td>Cake</td>
                        <td><input type="checkbox" name="checkbox-cake"/></td>
                    </tr>
                    <tr>
                        <td><img src={noodlesIcon} alt="noodles" width="50px" height="50px"/></td>
                        <td>Noodles</td>
                        <td><input type="checkbox" name="checkbox-noodles"/></td>
                    </tr>
                    <tr>
                        <td><img src={pieIcon} alt="pie" width="50px" height="50px"/></td>
                        <td>Pie</td>
                        <td><input type="checkbox" name="checkbox-pie"/></td>
                    </tr>
                    <tr>
                        <td><img src={pizzaIcon} alt="pizza" width="50px" height="50px"/></td>
                        <td>Pizza</td>
                        <td><input type="checkbox" name="checkbox-pizza"/></td>
                    </tr>
                    <tr>
                        <td><img src={saladIcon} alt="salad" width="50px" height="50px"/></td>
                        <td>Salads</td>
                        <td><input type="checkbox" name="checkbox-salad"/></td>
                    </tr>
                    <tr>
                        <td><img src={sandwichIcon} alt="sandwich" width="50px" height="50px"/></td>
                        <td>Sandwiches</td>
                        <td><input type="checkbox" name="checkbox-sandwich"/></td>
                    </tr>
                    <tr>
                        <td><img src={seafoodIcon} alt="seafood" width="50px" height="50px"/></td>
                        <td>Seafood</td>
                        <td><input type="checkbox" name="checkbox-seafood"/></td>
                    </tr>
                    <tr>
                        <td><img src={soupIcon} alt="soup" width="50px" height="50px"/></td>
                        <td>Soup</td>
                        <td><input type="checkbox" name="checkbox-soup"/></td>
                    </tr>
                </tbody>
            </table>
            </div>
        )
    }
}