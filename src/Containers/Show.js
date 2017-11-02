import React, { Component } from 'react';

export class Show extends Component {
  render(){
    return ( 
      <div className='blog-container'>
        <h3 className='blog-title'>{this.props.location.param1}</h3>
        <div name='blog-content' >
          <p>{this.props.location.param2}</p>
          <p>{this.props.match.params.id}</p>
        </div>
      </div>
    );
  }
}
