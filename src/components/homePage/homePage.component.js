import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './homePage.css'
import cakeIcon from './images/cake.png'
import pieIcon from './images/pie.png'
import pizzaIcon from './images/pizza.png'
import saladIcon from './images/salad.png'
import sandwichIcon from './images/sandwich.png'
import seafoodIcon from './images/seafood.png'
import soupIcon from './images/soup.png'
import noodlesIcon from './images/noodles.png'
import cookpadIcon from './images/cookpad.png'
import recipe1 from './images/butter-chicken.jpg'
import recipe2 from './images/lemon-zucchini-bread.jpg'
import recipe3 from './images/ramen.jpg'


export default class HomePage extends Component {
    constructor(props){
        super();
        this.incrSlide = this.incrSlide.bind(this);
        this.decrSlide = this.decrSlide.bind(this);
        this.autoShowSlides = this.autoShowSlides.bind(this);

        this.state = {
            slide_idx: 0,
            num_slides: 3,
            top3_slide: [{src:recipe1, alt:'recipe1', text:'Butter Chicken'}, 
                {src:recipe2, alt:'recipe2', text:'Lemon Zucchini Bread'}, 
                {src:recipe3, alt:'recipe3', text:'Ramen'}]
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.autoShowSlides();
        }, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    incrSlide(){
        if(this.state.slide_idx < this.state.num_slides-1){
            this.setState({ slide_idx: this.state.slide_idx+1 });
        } else {
            this.setState({ slide_idx: 0 });
        }
        const dots = document.getElementsByClassName("dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        dots[this.state.slide_idx].className += " active";
    }

    decrSlide(){
        if(this.state.slide_idx > 0){
            this.setState({ slide_idx: this.state.slide_idx-1 });
        } else {
            this.setState({ slide_idx: this.state.num_slides-1 });
        }
        const dots = document.getElementsByClassName("dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        dots[this.state.slide_idx].className += " active";
    }

    autoShowSlides(){
        this.incrSlide();
        const dots = document.getElementsByClassName("dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        dots[this.state.slide_idx].className += " active";
    }

    render(){
        return(
            <div id="body">
                <div className="container-sm">
                    <div id="navbar">
                        <ul>
                            <li><img src={cookpadIcon} alt="cookpad" width="50px" height="50px"/>COOKPAD</li>
                            <li id="first-item"><Link to="/addrecipe/1">Create a Recipe</Link></li>
                            <li><Link to="/myrecipes/1">My Recipes</Link></li>
                            <li><Link to="/myprofile/1">My Profile</Link></li>
                            <li><Link to="/users">Users</Link></li>
                            <li><Link to="/">Logout</Link></li>
                        </ul>
                    </div>

                    
                    <div id="left-panel">
                        <table>
                            <tbody>
                                <tr>
                                    <td><img src={cakeIcon} alt="cake" width="50px" height="50px"/></td>
                                    <td>Cake</td>
                                    <td><input type="checkbox" id="checkbox-cake" name="checkbox-cake"/></td>
                                </tr>
                                <tr>
                                    <td><img src={noodlesIcon} alt="noodles" width="50px" height="50px"/></td>
                                    <td>Noddles</td>
                                    <td><input type="checkbox" id="checkbox-noodles" name="checkbox-noodles"/></td>
                                </tr>
                                <tr>
                                    <td><img src={pieIcon} alt="pie" width="50px" height="50px"/></td>
                                    <td>Pie</td>
                                    <td><input type="checkbox" id="checkbox-pie" name="checkbox-pie"/></td>
                                </tr>
                                <tr>
                                    <td><img src={pizzaIcon} alt="pizza" width="50px" height="50px"/></td>
                                    <td>Pizza</td>
                                    <td><input type="checkbox" id="checkbox-pizza" name="checkbox-pizza"/></td>
                                </tr>
                                <tr>
                                    <td><img src={saladIcon} alt="salad" width="50px" height="50px"/></td>
                                    <td>Salads</td>
                                    <td><input type="checkbox" id="checkbox-salad" name="checkbox-salad"/></td>
                                </tr>
                                <tr>
                                    <td><img src={sandwichIcon} alt="sandwich" width="50px" height="50px"/></td>
                                    <td>Sandwiches</td>
                                    <td><input type="checkbox" id="checkbox-sandwich" name="checkbox-sandwich"/></td>
                                </tr>
                                <tr>
                                    <td><img src={seafoodIcon} alt="seafood" width="50px" height="50px"/></td>
                                    <td>Seafood</td>
                                    <td><input type="checkbox" id="checkbox-seafood" name="checkbox-seafood"/></td>
                                </tr>
                                <tr>
                                    <td><img src={soupIcon} alt="soup" width="50px" height="50px"/></td>
                                    <td>Soup</td>
                                    <td><input type="checkbox" id="checkbox-soup" name="checkbox-soup"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* middle panel */}
                    <div id="middle-panel">
                        {/* recipe slide show */}
                        <div className="slideshow-container">
                            <div className="">
                            <img src={this.state.top3_slide[this.state.slide_idx].src} alt={this.state.top3_slide[this.state.slide_idx].alt} height="380px" width="570px"/>
                            <div className="text">{ this.state.top3_slide[this.state.slide_idx].text }</div>
                            </div>

                            <p className="prev" onClick={this.decrSlide}>&#10094;</p>
                            <p className="next" onClick={this.incrSlide}>&#10095;</p>
                            <div className="dot-container">
                                <span className="dot"></span>
                                <span className="dot"></span> 
                                <span className="dot"></span> 
                            </div>
                        </div>

                        <div className="recipe-post">
                            <div className="tweetIconContainer">
                            </div>
                            <div className="tweetContent">
                                <h4>Recipe1</h4>
                                <p>Description1</p>
                            </div>
                        </div>
                    </div>
                    <div id="right-panel">
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>Top 3 Recipes</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Butter Chicken</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Lemon Zucchini Bread</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Ramen</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> 
            </div>
        )
    }
} 