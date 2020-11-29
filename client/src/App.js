import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { checkSession } from "./actions/user";
import "bootstrap/dist/css/bootstrap.min.css"

import AdminPage from "./components/adminPage/adminPage.component";
import AddRecipe from "./components/addRecipe/addRecipe.component";
import EditRecipe from "./components/editRecipe/editRecipe.component";
import HomePage from "./components/homePage/homePage.component";
import Login from "./components/login/login.component";
import EditProfile from "./components/editProfile/editProfile.component";
import Signup from "./components/signup/signup.component";
import ViewRecipe from './components/viewRecipe/viewRecipe.component';
import ViewProfile from './components/viewProfile/viewProfile.component';

export class App extends React.Component{
  constructor(props){
    super(props);
    checkSession(this);
  }

  state = {
    currentUser: null
  }

  render(){
    const { currentUser } = this.state;
    return (
        <BrowserRouter>
          <Switch>
            <Route
              exact path={["/", "/login", "/homepage"] /* any of these URLs are accepted. */ }
              render={ props => (
                <div className="app">
                    {!currentUser ? <Login {...props} app={this} /> : <HomePage {...props} app={this} />}
                </div>   
            )}
            />
            <Route path="/signup" exact render={props=><Signup {...props} app={this}/>}/>
            <Route path="/adminpage" exact render={props=><AdminPage {...props} app={this}/>}/>
            <Route path="/addrecipe" exact render={props=><AddRecipe {...props} app={this}/>}/>
            <Route path="/editrecipe/:rid" exact render={props=><EditRecipe {...props} app={this}/>}/>
            <Route path="/editprofile/:uid" exact render={props=><EditProfile {...props} app={this}/>}/>
            <Route path="/viewrecipe/:rid" exact render={props=><ViewRecipe {...props} app={this}/>}/>
            <Route path="/viewprofile/:uid" exact render={props=><ViewProfile {...props} app={this}/>}/>
            <Route render={() => <div>404 Not found</div>} />
          </Switch>
        </BrowserRouter>
    );
  }
  
}
export default App;
