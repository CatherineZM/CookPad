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
            <Route path="/adminpage" exact render={props=>(
              <div className="app">
                {!currentUser ? <Login {...props} app={this} /> : <AdminPage {...props} app={this} />}
              </div>
            )}/>
            <Route path="/addrecipe" exact render={props=>(
              <div className="app">
                {!currentUser ? <Login {...props} app={this} /> : <AddRecipe {...props} app={this} />}
              </div>
            )}/>
            <Route path="/editrecipe/:rid" exact render={props=>(
              <div className="app">
                {!currentUser ? <Login {...props} app={this} /> : <EditRecipe {...props} app={this} />}
              </div>
            )}/>
            <Route path="/viewrecipe/:rid" exact render={props=>(
              <div className="app">
                {!currentUser ? <Login {...props} app={this} /> : <ViewRecipe {...props} app={this} />}
              </div>
            )}/>
            <Route path="/viewprofile/:uid" exact render={props=>(
              <div className="app">
                {!currentUser ? <Login {...props} app={this} /> : <ViewProfile {...props} app={this} />}
              </div>
            )}/>
            <Route render={() => <div>404 Not found</div>} />
          </Switch>
        </BrowserRouter>
    );
  }
  
}
export default App;
