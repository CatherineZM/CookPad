import React, { Component } from 'react';
import Container from "@material-ui/core/Container"
import './viewProfile.css'
import Navbar from "../Navbar/navbar.component"
import ReceipeList from '../recipelist/recipelist.component'
import Avatar from 'react-avatar';
import {Collapse} from 'react-bootstrap'

// hard coded images
import ProfilePic from'./default-profile-pic.png' 
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
import { FaRegEdit } from "react-icons/fa";

const user_lst = [
    {uid: 0, username: "admin", name: "Nora", description: "I love Chinese Food!!!", isAdmin: true},
    {uid: 1, username: "user", name: "Catherine", description: "I love baking!!!", isAdmin: false},
    {uid: 127, username: "raon", name: "Raon", description: "I love blahblah!!!", isAdmin: false}
    ]

export default class ViewProfile extends Component {
    constructor(props){
        super(props);
        
        // requires server calls to fetch the recipes info and user profile info
        this.state = {
            uid: this.props.match.params.uid,
            user: user_lst.find(usr=>usr.uid === parseInt(this.props.match.params.uid)),
            userpicture: {src: ProfilePic},
            recipes: [
                {id:4, src:recipe5, liked: false, collected: false, title:'Homemade Spaghetti', likes:65, categories:[1]},
                {id:5, src:recipe6, liked: false, collected: false, title:'Apple Pie', likes:63, categories:[2]},
                {id:6, src:recipe7, liked: false, collected: false, title:'Homemade Pizza', likes:62, categories:[3]},
                {id:7, src:recipe8, liked: false, collected: false, title:'Greek Salad', likes:60, categories:[4]},
                {id:8, src:recipe9, liked: false, collected: false, title:'Seafood Sandwiches', likes:58, categories:[5, 6]},
                {id:9, src:recipe10, liked: false, collected: false, title:'Spicy seafood stew', likes:50, categories:[6, 7]},
                {id:10, src:recipe11, liked: false, collected: false, title:'Chicken Noodle Soup', likes:47, categories:[7]}
            ],
            collectRecipes:[{id:0, src:recipe1, liked: false, collected: false, title:'Butter Chicken', likes: 123, categories:[7]},
            {id:1, src:recipe2, liked: false, collected: false, title:'Lemon Zucchini Bread', likes: 100, categories:[0]},
            {id:2, src:recipe3, liked: false, collected: false, title:'Ramen', likes:98, categories:[1]},
            {id:3, src:recipe4, liked: false, collected: false, title:'Vanilla Cake', likes:76, categories:[0]},
            {id:4, src:recipe5, liked: false, collected: false, title:'Homemade Spaghetti', likes:65, categories:[1]},
            {id:5, src:recipe6, liked: false, collected: false, title:'Apple Pie', likes:63, categories:[2]},
            {id:6, src:recipe7, liked: false, collected: false, title:'Homemade Pizza', likes:62, categories:[3]},
            {id:7, src:recipe8, liked: false, collected: false, title:'Greek Salad', likes:60, categories:[4]}],
            curruid: this.props.match.params.curruid,
            recipeExpanded: false,
            collectionExpanded: false,
        }
    }


    componentDidMount() {
        // requires server calls to initialize recipes and user profile
    }

    handleRecipeExpandClick = () => {
        if(this.state.recipeExpanded){
            this.setState({ recipeExpanded: false });
        }else{
            this.setState({ recipeExpanded: true });
        }
    }
    handleCollectionExpandClick= () => {
        if(this.state.collectionExpanded){
            this.setState({ collectionExpanded: false });
        }else{
            this.setState({ collectionExpanded: true });
        }
    }

     clickHeart=(rid)=>{
        // need to update the information into database
        let new_recipes = this.state.recipes;
        this.state.recipes.forEach((recipe, idx)=>{
            if(recipe.id === rid){
                if(recipe.liked){
                    new_recipes[idx].liked = false;
                    new_recipes[idx].likes--;
                    this.setState({ recipes: new_recipes });
                }else{
                    new_recipes[idx].liked = true;
                    new_recipes[idx].likes++;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
        // console.log(this.state.recipes)
    }

    clickStar=(rid)=>{
        // need to update the information into database
        let new_recipes = this.state.recipes;
        this.state.recipes.forEach((recipe, idx)=>{
            if(recipe.id === rid){
                if(recipe.collected){
                    new_recipes[idx].collected = false;
                    this.setState({ recipes: new_recipes });
                }else{
                    new_recipes[idx].collected = true;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
        console.log(this.state.recipes)
    }

    editprofile=(e)=>{
        e.preventDefault();
        window.location = "/editprofile/"+this.state.uid;
    }

    editButtonGenerator=()=>{
        if (this.state.uid === this.state.curruid){
            return <button type="button"
                    className = "btn btn-outline-primary"
                    onClick={this.editprofile}>
                    <FaRegEdit/>
                    Edit Profile
                    </button>  
        }
        return null
    }

    RecipeExpandButtonGenerator=()=>{
        if(this.state.recipeExpanded){
            return <button type="button"
                    className = "btn btn-outline-primary" 
                    onClick={this.handleRecipeExpandClick}>
                    Collapse 
                    </button>
        }else{
            return <button type="button"
            className = "btn btn-outline-primary" 
            onClick={this.handleRecipeExpandClick}>
            View 
            </button>
        }
    }

    CollectionExpandButtonGenerator=()=>{
       if(this.state.collectionExpanded){
            return <button type="button"
                    className = "btn btn-outline-primary" 
                    onClick={this.handleCollectionExpandClick}>
                    Collapse 
                    </button>
        }else{
            return <button type="button"
                    className = "btn btn-outline-primary" 
                    onClick={this.handleCollectionExpandClick}>
                    View 
                    </button>
        }
    }
    
    componentWillReceiveProps(nextProps){
        if (nextProps.match.params.uid !== this.props.match.params.uid){
            const currUid = nextProps.match.params.uid
            const currUser = user_lst.find(parseInt(usr=>usr.uid) === currUid)
            this.setState({
                uid: currUid,
                user: currUser
            })
        }
    }

    clickRecipe=(userid,rid)=>{
        window.location = "/viewrecipe/"+ userid + "/" + rid;
    }

    CollectionRecipeGenerator=()=>{
        if(this.state.recipeExpanded){
            return <div id="collection-recipeswithEx">
                <h4>Your Collection
                <this.CollectionExpandButtonGenerator/>
                </h4>
                <Collapse in={this.state.collectionExpanded}>
                    <div className="recipe-list">
                        <ReceipeList   
                            recipes={this.state.collectRecipes}
                            clickHeart={this.clickHeart}
                            clickStar={this.clickStar}
                            clickRecipe = {this.clickRecipe}
                            userid={this.state.curruid}
                        />    
                    </div>
                    
                </Collapse> 
            </div>
        }else if(!this.state.recipeExpanded){
            return <div id="collection-recipes">
                    <h4>Your Collection
                    <this.CollectionExpandButtonGenerator/>
                    </h4>
                    <Collapse in={this.state.collectionExpanded}>
                        <div className="recipe-list">
                            <ReceipeList   
                                recipes={this.state.collectRecipes}
                                clickHeart={this.clickHeart}
                                clickStar={this.clickStar}
                                clickRecipe = {this.clickRecipe}
                                userid={this.state.curruid}
                            />    
                        </div>
                        
                    </Collapse> 
                </div>
        }
    }

    render(){
        return(
            <div>
            <Container maxWidth='md'>
                <Navbar uid={this.state.curruid}/>
                <div id="user-profile">
                    <h4>{this.state.user.name + "'s Profile"}</h4>
                    <Avatar id="user-picture" name="user" size="150" round={true} src={this.state.userpicture.src}/> 
                    <div>{this.state.user.description}</div>
                    <this.editButtonGenerator/>
                </div>
                
                
                <div id="user-recipes">
                    <h4>Your Recipes
                    <this.RecipeExpandButtonGenerator/>
                    </h4>
                    <Collapse in={this.state.recipeExpanded}>
                        <div className="recipe-list">
                            <ReceipeList   
                                recipes={this.state.recipes}
                                clickHeart={this.clickHeart}
                                clickStar={this.clickStar}
                                clickRecipe = {this.clickRecipe}
                                userid={this.state.curruid}
                            />    
                        </div>
                    </Collapse>
                </div>
                <this.CollectionRecipeGenerator/>
            </Container>
            </div> 
        )
    }
} 