import React, { Component } from 'react';

export class BlogItem extends Component {
  render(){
    return ( 
      <div className='blog-container'>
        <h3 className='blog-title'>{this.props.blog.title}</h3>
        <div name='blog-content' >
          <p>{this.props.blog.body}</p>
          <p>{this.props.blog.id}</p>
        </div>
      </div>
    );
  }
}
