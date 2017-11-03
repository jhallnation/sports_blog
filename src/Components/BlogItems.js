import React, { Component } from 'react';
import { BlogItem } from './BlogItem.js';

export class BlogItems extends Component {
  deleteBlog(id){
    this.props.onDelete(id);
  }
  
  render(){
    let BlogItems;
    if(this.props.blogs){
      BlogItems = this.props.blogs.map(blog => {
        return (
          <BlogItem onDelete={this.deleteBlog.bind(this)} key={ blog.id } blog={blog} />
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
  

