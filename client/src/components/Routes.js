import React, { Component } from 'react'
import { BrowserRouter as Router , Route ,Switch  } from 'react-router-dom';
import BrowserRouter from 'react-router-dom';
import Home from './Home';
import SignUp from './Signup';
import Profile from './Profile';
import Edit from './Edit';
import Detail from './Detail';

export class Routes extends Component {
    render() {
        return (
           <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/signUp" component={SignUp } />
               <Route exact path="/profile" component={Detail} />
               <Route exact path="/edit" component={Edit} />

           </Switch>
        )
    }
}

export default Routes
