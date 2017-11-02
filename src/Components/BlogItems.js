import React, { Component } from 'react';
import { BlogItem } from './BlogItem.js';

export class BlogItems extends Component {
  render(){
    let BlogItems;
    if(this.props.blogs){
      BlogItems = this.props.blogs.map(blog => {
        return (
          <BlogItem key={ blog.id } blog={blog} />
        );
      })
    }  
    return ( 
      <div>
        {BlogItems}
      </div>
    );
  }  
}
  

