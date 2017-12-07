import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Waypoint from 'react-waypoint';

export class Nav extends Component {
  constructor(){
    super();
    this.state = { 
      position: '',
      top: '',
      boxShadow: ''
    };
    this.changePosition = this.changePosition.bind(this);
  }

  componentWillMount(){
    this.setState({ 
      position: 'fixed',
      top: 0,
      boxShadow: ''
    });
  }

  changePosition(){
    const newPosition = this.state.position === 'fixed' ? 'static' : 'fixed';
    const newMargin = this.state.top === 0 ? 440 : 0;
    const newBoxShadow = this.state.boxShadow === 'inset 0px 11px 8px -10px #00181D, 0px 11px 8px -10px #00181D' ? '0px 11px 8px -10px #00181D' : 'inset 0px 11px 8px -10px #00181D, 0px 11px 8px -10px #00181D';
    this.setState({ 
      position: newPosition,
      top: newMargin,
      boxShadow: newBoxShadow
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
          <div className='nav-menu' style={{position: this.state.position, top: this.state.top, boxShadow: this.state.boxShadow}}>
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