import React, { Component } from 'react';
import Container from '@material-ui/core/Container'
import './style.css'
import Navbar from "../Navbar/navbar.component"
import ReceipeList from '../recipelist/recipelist.component'
import {Form, FormGroup, InputGroup} from 'react-bootstrap'

import recipe10 from '../../recipes/seafood-stew.png'
import recipe11 from '../../recipes/Chicken-Noodle-Soup.jpg'
import { FaRegSave } from "react-icons/fa";

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            uid: this.props.match.params.uid,
            // the following information is fetched from database according to curruid
            username: "Nora", 
            description: "I love Chinese Food!!!",
            recipes: [
                {id:9, src:recipe10, liked: false, collected: false, title:'Spicy seafood stew', likes:50, categories:[6, 7]},
                {id:10, src:recipe11, liked: false, collected: false, title:'Chicken Noodle Soup', likes:47, categories:[7]}
            ]
        }
    }

    componentDidMount() {
        // fetch user information and other recipes user created
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
                    new_recipes[idx].likes--;
                    this.setState({ recipes: new_recipes });
                }
            }
        })
        console.log(this.state.recipes)
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
        
        window.location = "/viewprofile/" + this.state.uid + "/" +this.state.uid;
    }

    onChangeDescription=(e)=>{
        e.preventDefault();
        this.setState({description: e.target.value});
    }

    enterKeyHandler(e){
        e.preventDefault();
        if (e.keyCode === 13){
            this.setState({description: this.state.description + '\n'});
        };
    }

    render(){
        return(
            <div className="edit-profile">
            
            <Container maxWidth='md'>
                <Navbar uid={this.state.uid}/>
                
                <div id="user-profile">
                    <h4>{this.state.username + "'s Profile:"}</h4>
                    <Form onSubmit={this.editprofile}>
                    <FormGroup id="profile-input">
                        <InputGroup>
                            <textarea value={this.state.description} onChange={this.onChangeDescription}/>
                        </InputGroup>
                        <FaRegSave class="save-button" onClick={this.editprofile}/>
                    </FormGroup>  
                    </Form>
                </div>
                
                <div id="user-recipes">
                    <h4>{this.state.username + "'s Recipes:"}</h4>
                    <ReceipeList 
                        recipes={this.state.recipes}
                        clickHeart={this.clickHeart}
                        clickStar={this.clickStar}
                        userid={this.state.uid}
                    />    
                </div>
            </Container> 
            </div>
        )
    }
} 