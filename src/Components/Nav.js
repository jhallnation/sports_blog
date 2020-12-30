import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Waypoint from 'react-waypoint';
import { withRouter } from "react-router";
import axios from 'axios';

class Nav extends Component {
  constructor(props){
    super(props);
    this.state = { 
      style: '',
    };

    this.changePosition = this.changePosition.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    axios.delete(
      'http://localhost:3000/api/logout',
      {
       headers: { 
          'jhUserEmail' : localStorage.getItem('userEmail')
        }
      }
    ).then(response =>{
      if (response.status === 200) {
        localStorage.setItem('token', '');
        localStorage.setItem('userEmail', '');
        this.props.history.push('/');
        this.props.handleSuccessfulLogout();
      }
      return response.data;
    }).catch(error => {
      console.log('Error on logout', error);
    });
  }

  componentWillMount(){
    this.setState({ style: 'nav-menu-fixed ' });
  }

  changePosition(){
    const newStyle = this.state.style === 'nav-menu-fixed ' ? 'nav-menu' : 'nav-menu-fixed ';
    this.setState({ style: newStyle });
  }

  render(){
    return ( 
        <div className='App-header'>
          <div className="site-top-image">
            <div className='site-title'>
              <h1>JHALL NATION</h1>
              <h2>Sports</h2>
            </div>
          </div>
            <Waypoint 
              onEnter={this.changePosition}
              onLeave={this.changePosition}
            />
          <div className={this.state.style} >
            <div className='nav-links-container'>
              <NavLink className='nav-links' activeClassName="active" to="/about">About</NavLink>
              <NavLink className='nav-links' exact activeClassName="active" to="/">Blog</NavLink>
              {this.props.loggedInStatus === 'LOGGED_IN' ? (
                <button className='nav-links logout-btn' onClick={this.handleLogout}>Logout</button>
              ) : (
                <NavLink className='nav-links' activeClassName="active" to="/login">Log In</NavLink>
              )}
            </div>
          </div>
        </div>
    );
  }
}

export default withRouter(Nav);