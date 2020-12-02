import React, { Component } from 'react';
import {getAllRecipes} from '../../actions/recipe';
import Container from '@material-ui/core/Container';

import './homePage.css'
import "bootstrap/dist/css/bootstrap.min.css"
import RecipeSlideShow from './slideshow/recipeSlideShow.component'
import HomePageLeftPanel from './leftpanel/homePageLeftPanel.component'
import Navbar from '../Navbar/navbar.component'
import HomePageRightPanel from './rightpanel/homePageRightPanel.component'
import RecipeList from '../recipelist/recipelist.component'
import TopRecipes from "./toprecipes/topRecipes.component"

import cakeIcon from './images/cake.png'
import pieIcon from './images/pie.png'
import pizzaIcon from './images/pizza.png'
import saladIcon from './images/salad.png'
import sandwichIcon from './images/sandwich.png'
import seafoodIcon from './images/seafood.png'
import soupIcon from './images/soup.png'
import noodlesIcon from './images/noodles.png'

// mappings between categories and id
// 0: cake; 1: noodles; 2: pie; 3: pizza; 4: salads; 5: sandwiches; 6: seafood; 7: soup 
export default class HomePage extends Component {
    constructor(props){
        super(props);
        
        this.props.history.push("/homepage");
        

        this.state = {
            slide_idx: 0,
            num_slides: 3,
            // this is the index into the recipes array
            top3_recipe: [],
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
            recipes: [],
            displayed_recipes: []
        }
        getAllRecipes(this);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.autoShowSlides();
        }, 3000)

        // TODO: init top3_recipe
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

    slideshowGenerator=()=>{
        if(this.state.top3_recipe && this.state.top3_recipe.length){
            return <RecipeSlideShow 
            imgsrc={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].filePath}
            imgalt={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].name}
            imgtext={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].name}
            decrSlide={this.decrSlide}
            incrSlide={this.incrSlide}
        />
        }else{
            return null;
        }
        
    }

    render(){
        const { app } = this.props;
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
                        <this.slideshowGenerator/>
                        <RecipeList 
                        recipes={this.state.displayed_recipes}
                        clickRecipe={this.clickRecipe}
                        clickHeart={this.clickHeart}
                        clickStar={this.clickStar}
                        app={app}
                        />
                    </div>

                    <HomePageRightPanel 
                    top3_recipe={this.state.top3_recipe} 
                    recipes={this.state.recipes}
                    clickHeart={this.clickHeart}
                    app={app}
                    />
                    
                    <TopRecipes
                    top3_recipe={this.state.top3_recipe}
                    recipes={this.state.recipes}
                    app={app}
                    />
                </Container> 
            </div>
        )
    }
} 