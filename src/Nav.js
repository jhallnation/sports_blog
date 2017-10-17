import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Nav extends Component {
  render(){
    return ( 
        <div>
          <div className="App-header">
            <div className='site-title'>
              <h1>JHALL NATION</h1><h2>Sports</h2>
            </div>
            <div className='nav-links-container'>
              <Link className='nav-links' to="">Home</Link>
              <Link className='nav-links' to="about">About</Link>
              <Link className='nav-links' to="contact">Contact</Link>
            </div>
          </div>
        </div>
    );
  }
}