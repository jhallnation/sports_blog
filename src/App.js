import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Components/Nav.js';
import About from './Containers/About.js';
import Login from './Containers/Login.js';
import Home from './Containers/Home.js';
import BlogPost from './Containers/BlogPost.js';

export class App extends Component {
  render() {
    return (
      <div>
         <BrowserRouter>
          <div className="App">
            <Nav />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path='/login' component={Login} />
              <Route 
                path='/blog/:slug'
                render={props => ( 
                  <BlogPost
                    {...props}
                  />
                )}
              />
            </Switch>
          </div> 
         </BrowserRouter>
      </div>
    );
  }
}

export default App;