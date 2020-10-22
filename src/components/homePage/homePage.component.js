import React, { Component } from 'react';
import './homePage.css'
import "bootstrap/dist/css/bootstrap.min.css"
import RecipeSlideShow from './slideshow/recipeSlideShow.component'
import HomePageLeftPanel from './leftpanel/homePageLeftPanel.component'
import Navbar from '../Navbar/navbar.component'
import HomePageRightPanel from './rightpanel/homePageRightPanel.component'
import ReceipeList from './recipelist/recipelist.component'

// hardcoded images
import recipe1 from '../recipes/butter-chicken.jpg'
import recipe2 from '../recipes/lemon-zucchini-bread.jpg'
import recipe3 from '../recipes/ramen.jpg'
import recipe4 from '../recipes/vanilla-cake.png'
import recipe5 from '../recipes/spaghetti.png'
import recipe6 from '../recipes/apple-pie.png'
import recipe7 from '../recipes/homemade-pizza.png'
import recipe8 from '../recipes/greek-salad.png'
import recipe9 from '../recipes/seafood-sandwiches.png'
import recipe10 from '../recipes/seafood-stew.png'
import recipe11 from '../recipes/whitebean-chicken-soup.png'


export default class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            slide_idx: 0,
            num_slides: 3,
            // the data will be fetched from the database
            top3_recipe: [{src:recipe1, title:'Butter Chicken', likes: 101, categories:['soup']}, 
                {src:recipe2, title:'Lemon Zucchini Bread', likes: 99, categories:['cake']}, 
                {src:recipe3, title:'Ramen', likes: 87, categories:['noodles']}],
            
            // the data will be fetched from the database
            recipes: [
                {src:recipe1, title:'Butter Chicken', likes: 101, categories:['soup']},
                {src:recipe2, title:'Lemon Zucchini Bread', likes: 99, categories:['cake']},
                {src:recipe3, title:'Ramen', likes:87, categories:['noodles']},
                {src:recipe4, title:'vanilla cake', likes:76, categories:['cake']},
                {src:recipe5, title:'Homemade Spaghetti', likes:65, categories:['noodles']},
                {src:recipe6, title:'Apple Pie', likes:63, categories:['pie']},
                {src:recipe7, title:'Homemade Pizza', likes:62, categories:['pizza']},
                {src:recipe8, title:'Greek Salad', likes:60, categories:['salad']},
                {src:recipe9, title:'Seafood Sandwiches', likes:58, categories:['seafood', 'sandwiches']},
                {src:recipe10, title:'Spicy seafood stew', likes:50, categories:['seafood', 'soup']},
                {src:recipe11, title:'White Bean Chicken Soup', likes:47, categories:['soup']}
            ]
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

    incrSlide = () => {
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

    decrSlide = () => {
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

    autoShowSlides = () => {
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
                    <Navbar/>
                    <HomePageLeftPanel/>                    

                    {/* middle panel */}
                    <div id="middle-panel">
                        {/* recipe slide show */}
                        <RecipeSlideShow 
                            imgsrc={this.state.top3_recipe[this.state.slide_idx].src}
                            imgalt={this.state.top3_recipe[this.state.slide_idx].title}
                            imgtext={this.state.top3_recipe[this.state.slide_idx].title}
                            decrSlide={this.decrSlide}
                            incrSlide={this.incrSlide}
                        />
                        <ReceipeList recipes={this.state.recipes}/>
                    </div>

                    <HomePageRightPanel top3_recipe={this.state.top3_recipe}/>
                </div> 
            </div>
        )
    }
} 