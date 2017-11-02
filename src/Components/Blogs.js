import React, { Component } from 'react';
import { NewBlog } from './NewBlog.js';

import { BlogItems } from '../Components/BlogItems';
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
    return ( 
      <div>
        <NewBlog addBlog={this.handleAddBlog.bind(this)} />
        <BlogItems blogs={this.state.blogs} />
      </div>
    );
  }
}