import React, { Component } from 'react';
import { Blogs } from '../Components/Blogs.js';



export class Home extends Component {
  render(){
    return ( 
      <div className='content-container'>
        <h1 className='page-title'>Blog</h1>
        <hr />
        <Blogs />
      </div>
    );
  }
}
