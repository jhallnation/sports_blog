import React, { Component } from 'react';

export class BlogItem extends Component {
  constructor(){
    super();
    this.truncateBlog = this.truncateBlog.bind(this);
  }

  truncateBlog(blogBody){
    if(blogBody.length > 200){
      return blogBody.substring(0, 200) + "...";
    }else{
      return blogBody;
    }
  }

  render(){
    return (
      <div className='blog-link' >
          <div className='blog-container'>
            <h3 className='blog-title'>{this.props.blog.title}</h3>
            <div name='blog-content' >
              <p>{this.truncateBlog(this.props.blog.body)}</p>
              <p>{this.props.blog.id}</p>
            </div>
          </div>
      </div>
    );
  }
}