import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import AdminPage from "./components/adminPage.component";
import AddRecipe from "./components/addRecipe/addRecipe.component";
import EditRecipe from "./components/editRecipe.component";
import HomePage from "./components/homePage/homePage.component";
import Login from "./components/login.component";
import MyProfile from "./components/myProfile.component";
import MyRecipes from "./components/myRecipes/myRecipes.component";
import Signup from "./components/signup.component";
import ViewRecipe from './components/viewRecipe/viewRecipe.component';
import { User } from './object';

export class App extends React.Component{

  state = {
    users: [new User(1, "user", "user"), new User(0, "admin", "admin", true)],
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
            <Route path="/adminpage" render = {()=>(<AdminPage appState = {this.state}/>)}/>
            <Route path="/homepage/:uid" render = {()=>(<HomePage appState = {this.state}/>)}/>
            <Route path="/addrecipe/:uid" render = {()=>(<AddRecipe appState = {this.state}/>)}/>
            <Route path="/editrecipe/:uid/:rid" render = {({match})=>(<EditRecipe {...match.params} appState = {this.state}/>)}/>
            <Route path="/myprofile/:uid" render = {({match})=>(<MyProfile {...match.params} appState = {this.state}/>)}/>
            <Route path="/myrecipes/:uid" render = {({match})=>(<MyRecipes {...match.params} appState = {this.state}/>)}/>
            <Route path="/viewrecipe/:rid" render = {({match})=>(<ViewRecipe {...match.params} appState = {this.state}/>)}/>
          </Switch>
        </Router>
      </div>
      
    );
  }
  
}
export default App;
