import React, { Component } from 'react';
import Container from "@material-ui/core/Container"
import './viewProfile.css'
import Navbar from "../Navbar/navbar.component"
import ReceipeList from '../recipelist/recipelist.component'
import Avatar from 'react-avatar';

// hard coded images
import ProfilePic from'./default-profile-pic.png' 
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
        
        this.state = {
            uid: this.props.match.params.uid,
            // the following information is fetched from database according to curruid
            user: user_lst.find(usr=>usr.uid == this.props.match.params.uid),
            userpicture: {src: ProfilePic},
            recipes: [
                {id:9, src:recipe10, liked: false, collected: false, title:'Spicy seafood stew', likes:50, categories:[6, 7]},
                {id:10, src:recipe11, liked: false, collected: false, title:'Chicken Noodle Soup', likes:47, categories:[7]}
            ],
            curruid: this.props.match.params.curruid
        }
        console.log(this.state.user)
        console.log(this.props.match.params.uid)
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
    
    componentWillReceiveProps(nextProps){
        if (nextProps.match.params.uid !== this.props.match.params.uid){
            const currUid = nextProps.match.params.uid
            const currUser = user_lst.find(usr=>usr.uid == currUid)
            this.setState({
                uid: currUid,
                user: currUser
            })
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
                    <h4>{this.state.user.name + "'s Recipes"}</h4>
                    <div id="recipe-list">
                    <ReceipeList 
                        recipes={this.state.recipes}
                        clickHeart={this.clickHeart}
                        clickStar={this.clickStar}
                        userid={this.state.uid}
                    />    
                    </div>  
                </div>
            </Container>
            </div> 
        )
    }
} 