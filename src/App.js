import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom"
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

function App() {
  return (
    <Router>
      <br/>
      <Route path="/" exact component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/users" component={Users}/>
      <Route path="/homepage/:uid" component={HomePage}/>
      <Route path="/addrecipe/:uid" component={AddRecipe}/>
      <Route path="/editrecipe/:uid/:rid" component={EditRecipe}/>
      <Route path="/myprofile/:uid" component={MyProfile}/>
      <Route path="/myrecipes/:uid" component={MyRecipes}/>
      <Route path="/viewrecipe/:uid/:rid" component={ViewRecipe}/>
    </Router>
  );
}

export default App;
