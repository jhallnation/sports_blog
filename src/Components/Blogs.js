import React, { Component } from 'react';
import { NewBlog } from './NewBlog.js';
import { BlogItem } from './BlogItem.js';
import $ from 'jquery';
import '../App.css';

export class Blogs extends Component {
  constructor(){
    super();
    this.state = { blogs: [] };
  }

  getBlogPosts(){
    $.ajax({
      url: "http://localhost:3001/blogs",
      dataType: 'json',
      cache:false,
      success: function(data){
        this.setState({blogs: data});
      }.bind(this),
      error: function(xhr, status, err){
        alert(err);
      }
    });
  }

  componentWillMount(){
    this.setState({blogs: []
  });
    this.getBlogPosts();
  }
  componentDidMount(){
    this.getBlogPosts();
  }

  handleAddBlog(blog){
    let data = blog;
    console.log(data);
    $.ajax({
      url: "http://localhost:3001/blogs",
      dataType: 'json',
      type: 'POST',
      data: {blog: blog},
      success: function(data){
        alert('New Blog Created!');
      },
      error: function(xhr, status, err){
        alert(err);
      }
    });
  }

  render(){

    let BlogItems;
    if(this.state.blogs){

      BlogItems = this.state.blogs.map(function(blog, index){
                    return (
                      <BlogItem key={ index } blog={blog} />
                    );
                  })
    }

    return ( 
      <div>
        <NewBlog addBlog={this.handleAddBlog.bind(this)} />
        {BlogItems}
      </div>
    );
  }
}