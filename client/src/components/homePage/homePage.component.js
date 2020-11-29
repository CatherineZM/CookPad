import React, { Component } from 'react';
import Container from '@material-ui/core/Container';

import './homePage.css'
import "bootstrap/dist/css/bootstrap.min.css"
import RecipeSlideShow from './slideshow/recipeSlideShow.component'
import HomePageLeftPanel from './leftpanel/homePageLeftPanel.component'
import Navbar from '../Navbar/navbar.component'
import HomePageRightPanel from './rightpanel/homePageRightPanel.component'
import ReceipeList from '../recipelist/recipelist.component'
import TopRecipes from "./toprecipes/topRecipes.component"

import cakeIcon from './images/cake.png'
import pieIcon from './images/pie.png'
import pizzaIcon from './images/pizza.png'
import saladIcon from './images/salad.png'
import sandwichIcon from './images/sandwich.png'
import seafoodIcon from './images/seafood.png'
import soupIcon from './images/soup.png'
import noodlesIcon from './images/noodles.png'

// hardcoded images
import recipe1 from '../../recipes/butter-chicken.jpg'
import recipe2 from '../../recipes/lemon-zucchini-bread.jpg'
import recipe3 from '../../recipes/ramen.jpg'
import recipe4 from '../../recipes/vanilla-cake.png'
import recipe5 from '../../recipes/spaghetti.png'
import recipe6 from '../../recipes/apple-pie.png'
import recipe7 from '../../recipes/homemade-pizza.png'
import recipe8 from '../../recipes/greek-salad.png'
import recipe9 from '../../recipes/seafood-sandwiches.png'
import recipe10 from '../../recipes/seafood-stew.png'
import recipe11 from '../../recipes/Chicken-Noodle-Soup.jpg'

// mappings between categories and id
// 0: cake; 1: noodles; 2: pie; 3: pizza; 4: salads; 5: sandwiches; 6: seafood; 7: soup 
export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.props.history.push("/homepage");
        // the data will be fetched from the database and calculated in component_DidMount callback
        this.state = {
            slide_idx: 0,
            num_slides: 3,
            // this is the index into the recipes array
            top3_recipe: [0, 1, 2],
            // categories 
            categories: [
                {id:0, src:cakeIcon, text:'Cake', checked:true},
                {id:1, src:noodlesIcon, text:'Noodles', checked:true},
                {id:2, src:pieIcon, text:'Pie', checked:true},
                {id:3, src:pizzaIcon, text: 'Pizza', checked:true},
                {id:4, src:saladIcon, text: 'Salads', checked:true},
                {id:5, src:sandwichIcon, text:'Sandwiches', checked:true},
                {id:6, src:seafoodIcon, text: 'Seafood', checked:true},
                {id:7, src:soupIcon, text:'Soup', checked:true}
            ],
            all_checked: true,
            // the data will be fetched from the database
            recipes: [
                {id:0, src:recipe1, liked: false, collected: false, title:'Butter Chicken', likes: 123, categories:[7]},
                {id:1, src:recipe2, liked: false, collected: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
                {id:2, src:recipe3, liked: false, collected: false, title:'Ramen', likes:98, categories:[1]},
                {id:3, src:recipe4, liked: false, collected: false, title:'Vanilla Cake', likes:76, categories:[0]},
                {id:4, src:recipe5, liked: false, collected: false, title:'Homemade Spaghetti', likes:65, categories:[1]},
                {id:5, src:recipe6, liked: false, collected: false, title:'Apple Pie', likes:63, categories:[2]},
                {id:6, src:recipe7, liked: false, collected: false, title:'Homemade Pizza', likes:62, categories:[3]},
                {id:7, src:recipe8, liked: false, collected: false, title:'Greek Salad', likes:60, categories:[4]},
                {id:8, src:recipe9, liked: false, collected: false, title:'Seafood Sandwiches', likes:58, categories:[5, 6]},
                {id:9, src:recipe10, liked: false, collected: false, title:'Spicy seafood stew', likes:50, categories:[6, 7]},
                {id:10, src:recipe11, liked: false, collected: false, title:'Chicken Noodle Soup', likes:47, categories:[7]}
            ],
            displayed_recipes: [
                {id:0, src:recipe1, liked: false, collected: false, title:'Butter Chicken', likes: 123, categories:[7]},
                {id:1, src:recipe2, liked: false, collected: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
                {id:2, src:recipe3, liked: false, collected: false, title:'Ramen', likes:98, categories:[1]},
                {id:3, src:recipe4, liked: false, collected: false, title:'Vanilla Cake', likes:76, categories:[0]},
                {id:4, src:recipe5, liked: false, collected: false, title:'Homemade Spaghetti', likes:65, categories:[1]},
                {id:5, src:recipe6, liked: false, collected: false, title:'Apple Pie', likes:63, categories:[2]},
                {id:6, src:recipe7, liked: false, collected: false, title:'Homemade Pizza', likes:62, categories:[3]},
                {id:7, src:recipe8, liked: false, collected: false, title:'Greek Salad', likes:60, categories:[4]},
                {id:8, src:recipe9, liked: false, collected: false, title:'Seafood Sandwiches', likes:58, categories:[5, 6]},
                {id:9, src:recipe10, liked: false, collected: false, title:'Spicy seafood stew', likes:50, categories:[6, 7]},
                {id:10, src:recipe11, liked: false, collected: false, title:'Chicken Noodle Soup', likes:47, categories:[7]}
            ]
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.autoShowSlides();
        }, 3000)
        // initialize recipes, displayed recipes, top3_recipe id
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

    clickRecipe=(rid)=>{
        this.props.history.push("/viewrecipe/"+ rid);
    }

    clickStar=(rid)=>{
        // require server call to update recipe information
        const new_recipes = [];
        const new_displayed_recipes = [];
        this.state.recipes.forEach((recipe)=>{
            const new_recipe = Object.create(recipe)
            if(recipe.id === rid){
                if(new_recipe.collected){
                    new_recipe.collected = false;
                }else{
                    new_recipe.collected = true;
                }
            }
            new_recipes.push(new_recipe)
        })

        this.setState({ recipes: new_recipes });
        this.state.displayed_recipes.forEach((recipe)=>{
            const new_recipe = Object.create(recipe)
            if(new_recipe.id === rid){
                if(new_recipe.collected){
                    new_recipe.collected = false;
                }else{
                    new_recipe.collected = true;
                }
            }
            new_displayed_recipes.push(new_recipe)
        })
        this.setState({ displayed_recipes: new_displayed_recipes });
    }

    clickHeart=(rid)=>{
        // require server call to update recipe information
        const new_recipes = [];
        const new_displayed_recipes = [];
        this.state.recipes.forEach((recipe)=>{
            const new_recipe = Object.create(recipe)
            if(recipe.id === rid){
                if(new_recipe.liked){
                    new_recipe.liked = false;
                    new_recipe.likes--;
                }else{
                    new_recipe.liked = true;
                    new_recipe.likes++;
                }
            }
            new_recipes.push(new_recipe)
        })

        this.setState({ recipes: new_recipes });
        this.state.displayed_recipes.forEach((recipe)=>{
            const new_recipe = Object.create(recipe)
            if(new_recipe.id === rid){
                if(new_recipe.liked){
                    new_recipe.liked = false;
                    new_recipe.likes--;
                }else{
                    new_recipe.liked = true;
                    new_recipe.likes++;
                }
            }
            new_displayed_recipes.push(new_recipe)
        })
        this.setState({ displayed_recipes: new_displayed_recipes });

        // update top three recipes
        let first_largest = 0;
        let second_largest = 0;
        let third_largest = 0;
        let first_idx = 0;
        let second_idx = 0;
        let third_idx = 0;
        for(let i=0; i< new_recipes.length; i++){
            if(new_recipes[i].likes > first_largest){
                third_largest = second_largest;
                second_largest = first_largest;
                first_largest = new_recipes[i].likes;
                first_idx = i;
            }else if(new_recipes[i].likes > second_largest){
                third_largest = second_largest;
                second_largest = new_recipes[i].likes;
                second_idx = i;
            }else if(new_recipes[i].likes > third_largest){
                third_largest = new_recipes[i].likes;
                third_idx = i;
            }
        }
        this.setState({ top3_recipe: [first_idx, second_idx, third_idx]})
    }

    clickCategory = (event)=>{
        const new_categories = this.state.categories;
        new_categories[event.target.name].checked = !this.state.categories[event.target.name].checked;
        this.setState({ categories: new_categories});

        const categories_ondisplay = []
        for(let i = 0; i < this.state.categories.length; i++){
            if(this.state.categories[i].checked)
            categories_ondisplay.push(i)
        }

        // show and hide receipes
        const new_recipes = []
        for(let i = 0; i < this.state.recipes.length; i++){
            for(let j = 0; j < this.state.recipes[i].categories.length; j++){
                if(categories_ondisplay.includes(this.state.recipes[i].categories[j])){ 
                    new_recipes.push(this.state.recipes[i]);
                    break;
                }
            }
        }
        this.setState({ displayed_recipes: new_recipes });
    }

    clickAll = (e) => {
        this.setState({ all_checked: !this.state.all_checked})
        let all_checked = !this.state.all_checked;
        let new_categories = this.state.categories
        new_categories.forEach((category)=>{category.checked = all_checked})
        this.setState({ categories: new_categories});
        if(all_checked){
            this.setState({ displayed_recipes: this.state.recipes});
        }else{
            this.setState({ displayed_recipes: []});
        }
    }

    render(){
        const { history, app } = this.props;
        return(
            <div id="body">
                
                <Container maxWidth='md'>
                    <Navbar app={app}/>
                    <HomePageLeftPanel
                        categories={this.state.categories}
                        clickCategory={this.clickCategory}
                        all_checked={this.state.all_checked}
                        clickAll={this.clickAll}
                    />                    

                    <div id="middle-panel">
                        <RecipeSlideShow 
                            imgsrc={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].src}
                            imgalt={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].title}
                            imgtext={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].title}
                            decrSlide={this.decrSlide}
                            incrSlide={this.incrSlide}
                        />
                        <ReceipeList 
                        recipes={this.state.displayed_recipes}
                        clickRecipe={this.clickRecipe}
                        clickHeart={this.clickHeart}
                        clickStar={this.clickStar}
                        />
                    </div>

                    <HomePageRightPanel 
                    top3_recipe={this.state.top3_recipe} 
                    recipes={this.state.recipes}
                    clickHeart={this.clickHeart}
                    userid={this.state.uid}
                    />
                    
                    <TopRecipes
                    top3_recipe={this.state.top3_recipe}
                    recipes={this.state.recipes}
                    userid={this.state.uid}
                    />
                </Container> 
            </div>
        )
    }
} 