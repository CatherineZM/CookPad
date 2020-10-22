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
            top3_recipe: [0, 1, 2],
            
            // the data will be fetched from the database
            recipes: [
                {id:0, src:recipe1, liked: false, title:'Butter Chicken', likes: 101, categories:['soup']},
                {id:1, src:recipe2, liked: false, title:'Lemon Zucchini Bread', likes: 99, categories:['cake']},
                {id:2, src:recipe3, liked: false, title:'Ramen', likes:87, categories:['noodles']},
                {id:3, src:recipe4, liked: false, title:'vanilla cake', likes:76, categories:['cake']},
                {id:4, src:recipe5, liked: false, title:'Homemade Spaghetti', likes:65, categories:['noodles']},
                {id:5, src:recipe6, liked: false, title:'Apple Pie', likes:63, categories:['pie']},
                {id:6, src:recipe7, liked: false, title:'Homemade Pizza', likes:62, categories:['pizza']},
                {id:7, src:recipe8, liked: false, title:'Greek Salad', likes:60, categories:['salad']},
                {id:8, src:recipe9, liked: false, title:'Seafood Sandwiches', likes:58, categories:['seafood', 'sandwiches']},
                {id:9, src:recipe10, liked: false, title:'Spicy seafood stew', likes:50, categories:['seafood', 'soup']},
                {id:10, src:recipe11, liked: false, title:'White Bean Chicken Soup', likes:47, categories:['soup']}
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

    clickHeart = (rid) => {
        // need to update the information into database
        if(this.state.recipes[rid].liked){
            let new_recipes = this.state.recipes
            new_recipes[rid].liked = false;
            new_recipes[rid].likes--;
            this.setState({ recipes: new_recipes });
        }else{
            let new_recipes = this.state.recipes
            new_recipes[rid].liked = true;
            new_recipes[rid].likes++;
            this.setState({ recipes: new_recipes });
        }

        // update top three recipes
        
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
                            imgsrc={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].src}
                            imgalt={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].title}
                            imgtext={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].title}
                            decrSlide={this.decrSlide}
                            incrSlide={this.incrSlide}
                        />
                        <ReceipeList 
                        recipes={this.state.recipes}
                        clickHeart={this.clickHeart}
                        />
                    </div>

                    <HomePageRightPanel 
                    top3_recipe={this.state.top3_recipe} 
                    recipes={this.state.recipes}
                    clickHeart={this.clickHeart}
                    />
                </div> 
            </div>
        )
    }
} 