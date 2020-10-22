import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import Users from "./components/users.component";
import AddRecipe from "./components/addRecipe.component";
import EditRecipe from "./components/editRecipe.component";
import HomePage from "./components/homePage/homePage.component";
import Login from "./components/login.component";
import MyProfile from "./components/myProfile.component";
import MyRecipes from "./components/myRecipes.component";
import Signup from "./components/signup.component";
import ViewRecipe from './components/viewRecipe.component';
import { User } from './object';

export class App extends React.Component{

  state = {
    users: [new User("user", "user"), new User("admin", "admin", true)],
    recipes: [],
    userCount: 2,
    recipeCount: 0
  }

  render(){
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render = {()=>(<Login appState = {this.state}/>)}/>
            <Route path="/signup" render = {()=>(<Signup appState = {this.state}/>)}/>
            <Route path="/users" render = {()=>(<Users appState = {this.state}/>)}/>
            <Route path="/homepage/:uid" render = {()=>(<HomePage appState = {this.state}/>)}/>
            <Route path="/addrecipe/:uid" render = {()=>(<AddRecipe appState = {this.state}/>)}/>
            <Route path="/editrecipe/:uid/:rid" render = {()=>(<EditRecipe appState = {this.state}/>)}/>
            <Route path="/myprofile/:uid" render = {()=>(<MyProfile appState = {this.state}/>)}/>
            <Route path="/myrecipes/:uid" render = {()=>(<MyRecipes appState = {this.state}/>)}/>
            <Route path="/viewrecipe/:rid" render = {()=>(<ViewRecipe appState = {this.state}/>)}/>
          </Switch>
        </Router>
      </div>
      
    );
  }
  
}
export default App;
