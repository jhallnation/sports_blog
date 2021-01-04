import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Nav from './Components/Nav.js';
import About from './Containers/About.js';
import Login from './Containers/Login.js';
import Blogs from './Containers/Blogs.js';
import BlogPost from './Containers/BlogPost.js';
import NoMatch from './Containers/NoMatch.js';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN'
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);

  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: 'LOGGED_IN'
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN'
    });
  }

  checkLoginStatus() {
    return axios.get(
      'http://localhost:3000/api/logged_in',
      {
        headers: {
          'Authorization' : localStorage.getItem('token'),
          'jhUserEmail' : localStorage.getItem('userEmail')
        }
      }
    ).then(res => {
      const loggedIn = res.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if (loggedIn && loggedInStatus === 'LOGGED_IN') {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === 'NOT_LOGGED_IN') {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === 'LOGGED_IN') {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    }).catch(err => {
      console.log('error', err);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <div>
         <BrowserRouter>
          <div className="App">
            <Nav
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
            <Switch>
              <Route 
                exact path='/' 
                render={props => (
                  <Blogs
                  {...props}
                  loggedInStatus={this.state.loggedInStatus}
                  />
                )} 
              />
              <Route path='/about' component={About} />
              <Route 
                path='/login' 
                render={props => (
                  <Login
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />    
                )} 
              />
              <Route 
                path='/blog/:slug'
                render={props => ( 
                  <BlogPost
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
              />
              <Route component={ NoMatch }/>
            </Switch>
          </div> 
         </BrowserRouter>
      </div>
    );
  }
}

export default App;