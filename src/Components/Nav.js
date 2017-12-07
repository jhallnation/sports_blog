import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Waypoint from 'react-waypoint';

export class Nav extends Component {
  constructor(){
    super();
    this.state = { 
      position: '',
      top: ''
    };
    this.changePosition = this.changePosition.bind(this);
  }

  componentWillMount(){
    this.setState({ 
      position: 'fixed',
      top: 0
    });
  }

  changePosition(){
    const newPosition = this.state.position === 'fixed' ? 'static' : 'fixed';
    const newMargin = this.state.top === 0 ? 440 : 0;
    this.setState({ 
      position: newPosition,
      top: newMargin
     });
  }

  render(){
    return ( 
        <div className='App-header'>
          <div className="site-top-image">
            <div className='site-title'>
              <h1>JHALL NATION</h1><h2>Sports</h2>
            </div>
          </div>
            <Waypoint 
              onEnter={this.changePosition}
              onLeave={this.changePosition}
              />
          <div className='nav-menu' style={{position: this.state.position, top: this.state.top}}>
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