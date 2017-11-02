import React, { Component } from 'react';

export class Show extends Component {
  render(){
    return ( 
      <div className='blog-container'>
        <h3 className='blog-title'>testing</h3>
        <div name='blog-content' >
          <p></p>
          <p></p>
          <p>{console.log(this)}</p>
        </div>
      </div>
    );
  }
}
