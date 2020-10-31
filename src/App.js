import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"

import AdminPage from "./components/adminPage/adminPage.component";
import AddRecipe from "./components/addRecipe/addRecipe.component";
import EditRecipe from "./components/editRecipe/editRecipe.component";
import HomePage from "./components/homePage/homePage.component";
import Login from "./components/login/login.component";
import EditProfile from "./components/editProfile/editProfile.component";
import Signup from "./components/signup/signup.component";
import ViewRecipe from './components/viewRecipe/viewRecipe.component';
import MyCollection from './components/myCollection/myCollection.component';
import ViewProfile from './components/viewProfile/viewProfile.component';

export class App extends React.Component{
  render(){
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component = {Login}/>
            <Route path="/signup" component = {Signup}/>
            <Route path="/adminpage" component = {AdminPage}/>
            <Route path="/homepage/:uid" component = {HomePage}/>
            <Route path="/addrecipe/:uid" component = {AddRecipe}/>
            <Route path="/editrecipe/:uid/:rid" component = {EditRecipe}/>
            <Route path="/editprofile/:uid" component = {EditProfile}/>
            <Route path="/mycollection/:uid" component = {MyCollection}/>
            <Route path="/viewrecipe/:uid/:rid" component = {ViewRecipe}/>
            <Route path="/viewprofile/:uid/:curruid" component = {ViewProfile}/>
          </Switch>
        </Router>
      </div>
      
    );
  }
  
}
export default App;
