import React, { Component } from 'react';
import Container from '@material-ui/core/Container'
import './editProfile.css'
import Navbar from "../Navbar/navbar.component"
import ReceipeList from '../recipelist/recipelist.component'
import Avatar from 'react-avatar-edit';

import ProfilePic from'../viewProfile/default-profile-pic.png' 
import recipe10 from '../../recipes/seafood-stew.png'
import recipe11 from '../../recipes/Chicken-Noodle-Soup.jpg'
import { FaRegSave } from "react-icons/fa";

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        
        // requires server calle to fetch the following information
        this.state = {
            uid: this.props.match.params.uid,
            username: "Catherine", 
            userpicture: {src: ProfilePic},
            picturePreview: null, 
            description: "I love baking!!!",
            recipes: [
                {id:9, src:recipe10, liked: false, collected: false, title:'Spicy seafood stew', likes:50, categories:[6, 7]},
                {id:10, src:recipe11, liked: false, collected: false, title:'Chicken Noodle Soup', likes:47, categories:[7]}
            ]
        }
    }

    componentDidMount() {
        // requires server call to fetch user information and recipes user created
    }

    clickHeart=(rid)=>{
        // requires server call to update the information
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
        // requires server call to update the information
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
        // requires server call to push the new profile picture 
        // and the new description into the server 
        window.location = "/viewprofile/" + this.state.uid + "/" +this.state.uid;
    }

    onClose=(e)=>{
        this.setState({preview: null})
    }
      
    onCrop=(e,preview)=>{
        this.setState({preview})
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

    clickRecipe=(userid,rid)=>{
        window.location = "/viewrecipe/"+ userid + "/" + rid;
    }

    render(){
        return(
            <div className="edit-profile">
            
            <Container maxWidth='md'>
                <Navbar uid={this.state.uid}/>
                
                <div id="user-profile">
                    <h4>{this.state.username + "'s Profile"}</h4>
                    <form onSubmit={this.editprofile}>
                        <div id="picture-change">
                            <Avatar 
                                width={200}
                                height={200} 
                                round={true} 
                                onCrop={this.onCrop}
                                onClose={this.onClose}
                                src={this.state.userpicture.src}
                            /> 
                        </div>    
                        <div className="form-group" id="profile-input">
                            <textarea className = "form-control" value={this.state.description} onChange={this.onChangeDescription}/>
                            <button type="button"
                                    className = "btn btn-outline-primary"
                                    onClick={this.editprofile}>
                                <FaRegSave/>
                                Save Profile
                            </button>    
                        </div>  
                    </form>
                </div>
                
                <div id="user-recipes">
                    <h4>{this.state.username + "'s Recipes"}</h4>
                    <ReceipeList 
                        recipes={this.state.recipes}
                        clickHeart={this.clickHeart}
                        clickStar={this.clickStar}
                        clickRecipe = {this.clickRecipe}
                        userid={this.state.uid}
                    />    
                </div>
            </Container> 
            </div>
        )
    }
} 