import React, { Component } from 'react';
import { BlogItem } from './BlogItem.js';

export class BlogItems extends Component {
  deleteBlog(id){
    this.props.onDelete(id);
  }

  editBlog(blog){
    this.props.onEdit(blog);
  }

  render(){
    let BlogItems;
    if(this.props.blogs){
      BlogItems = this.props.blogs.map(blog => {
        return (
          <BlogItem onDelete={this.deleteBlog.bind(this)} key={ blog.id } blog={blog} onEdit={this.editBlog.bind(this)}/>
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
  

