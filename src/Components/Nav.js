import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class Nav extends Component {
  render(){
    return ( 
        <div>
          <div className="App-header">
            <div className='site-title'>
              <h1>JHALL NATION</h1><h2>Sports</h2>
            </div>
            <div className='nav-links-container'>
              <NavLink className='nav-links' activeClassName="active" to="/about">About</NavLink>
              <NavLink className='nav-links' exact activeClassName="active" to="/">Blog</NavLink>
              <NavLink className='nav-links' activeClassName="active" to="/contact">Contact</NavLink>
            </div>
          </div>
        </div>
    );
  }
}