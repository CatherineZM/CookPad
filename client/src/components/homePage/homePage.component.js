import React, { Component } from 'react';
import {getAllRecipes, setRecipe, DeleteFromRecipeList, addToRecipeList} from '../../actions/recipe';
import {Container} from '@material-ui/core';

// import css
import './homePage.css'
import "bootstrap/dist/css/bootstrap.min.css"

// import components
import RecipeSlideShow from './slideshow/recipeSlideShow.component'
import HomePageLeftPanel from './leftpanel/homePageLeftPanel.component'
import Navbar from '../Navbar/navbar.component'
import HomePageRightPanel from './rightpanel/homePageRightPanel.component'
import RecipeList from '../recipelist/recipelist.component'
import TopRecipes from "./toprecipes/topRecipes.component"

// static images
import cakeIcon from './images/cake.png'
import pieIcon from './images/pie.png'
import pizzaIcon from './images/pizza.png'
import saladIcon from './images/salad.png'
import sandwichIcon from './images/sandwich.png'
import seafoodIcon from './images/seafood.png'
import soupIcon from './images/soup.png'
import noodlesIcon from './images/noodles.png'

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.props.history.push("/homepage");
        this.state = {
            slide_idx: 0,
            num_slides: 3,
            // this is the index into the recipes array
            top3_recipe: [],
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
        if(this.state.recipes && this.state.recipes.length >=3){
            this.incrSlide();
            const dots = document.getElementsByClassName("dot");
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }
            dots[this.state.slide_idx].className += " active";
        }
    }

    clickRecipe=(rid)=>{
        this.props.history.push("/viewrecipe/"+ rid);
    }

    clickStar=(rid)=>{
        if(this.props.app.state.currentUser.collectedRecipes.includes(rid)){
            this.props.app.state.currentUser.collectedRecipes = this.props.app.state.currentUser.collectedRecipes.filter(recipe=> recipe !== rid)
            DeleteFromRecipeList(this.props.app.state.currentUser._id, {collectedRecipes: rid})
        }else{
            this.props.app.state.currentUser.collectedRecipes.push(rid)
            addToRecipeList(this.props.app.state.currentUser._id, {collectedRecipes: rid})
        }

        this.setState({num_slides: 3})
    }

    clickHeart=async(rid)=>{
        let newLikes = 0;
        const new_recipes = [];
        const new_displayed_recipes = [];
        if(this.props.app.state.currentUser.likedRecipes.includes(rid)){
            this.props.app.state.currentUser.likedRecipes = this.props.app.state.currentUser.likedRecipes.filter(recipe=> recipe !== rid)
            await DeleteFromRecipeList(this.props.app.state.currentUser._id, {likedRecipes: rid})
            this.state.recipes.forEach((recipe)=>{
                const new_recipe = Object.create(recipe)
                console.log(new_recipe)
                if(recipe._id === rid){
                    new_recipe.likes--;
                    newLikes = new_recipe.likes;
                }
                new_recipes.push(new_recipe)
            })
            this.setState({ recipes: new_recipes });

            this.state.displayed_recipes.forEach((recipe)=>{
            const new_recipe = Object.create(recipe)
            if(new_recipe._id === rid){
                new_recipe.likes--;
            }
            new_displayed_recipes.push(new_recipe)
            })
            this.setState({ displayed_recipes: new_displayed_recipes });
        }else{
            this.props.app.state.currentUser.likedRecipes.push(rid)
            await addToRecipeList(this.props.app.state.currentUser._id, {likedRecipes: rid})
            this.state.recipes.forEach((recipe)=>{
                const new_recipe = Object.create(recipe)
                if(recipe._id === rid){
                    new_recipe.likes++;
                    newLikes = new_recipe.likes;
                }
                new_recipes.push(new_recipe)
            })
            this.setState({ recipes: new_recipes });

            this.state.displayed_recipes.forEach((recipe)=>{
                const new_recipe = Object.create(recipe)
                if(new_recipe._id === rid){
                    new_recipe.likes++;
                }
                new_displayed_recipes.push(new_recipe)
            })
            this.setState({ displayed_recipes: new_displayed_recipes });
        }

        // server call to update recipe
        setRecipe(rid, {likes: newLikes})
    }

    clickCategory = (event) =>{
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
            imgsrc={this.state.recipes[this.state.top3_recipe[this.state.slide_idx]].imageUrl}
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
                        {this.state.recipes && this.state.recipes.length >= 3 && <this.slideshowGenerator/>}
                        <div id="recipe-list">
                            <RecipeList 
                            recipes={this.state.displayed_recipes}
                            clickRecipe={this.clickRecipe}
                            clickHeart={this.clickHeart}
                            clickStar={this.clickStar}
                            app={app}
                            />
                        </div>
                    </div>

                    <div id="right-panel">
                        {this.state.recipes && this.state.recipes.length >= 3 &&
                        <HomePageRightPanel 
                        top3_recipe={this.state.top3_recipe} 
                        recipes={this.state.recipes}
                        app={app}
                        clickHeart={this.clickHeart}
                        />}
                        
                        {this.state.recipes && this.state.recipes.length >= 3 &&
                        <TopRecipes
                        top3_recipe={this.state.top3_recipe}
                        recipes={this.state.recipes}
                        app={app}
                        />}
                    </div>
                </Container> 
            </div>
        )
    }
} 