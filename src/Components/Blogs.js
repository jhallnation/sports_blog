import React, { Component } from 'react';

import { BlogItems } from '../Components/BlogItems';
import $ from 'jquery';
import '../App.css';

export class Blogs extends Component {
  constructor(){
    super();
    this.state = { 
      blogs: [],
      page: 1
    };
    this.pagePagination = this.pagePagination.bind(this);
  }
 
  getBlogPosts(){
    $.ajax({
      url: "http://localhost:3001/blogs?page=" + this.state.page,
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

  handleAddBlog(blog){
    $.ajax({
      url: "http://localhost:3001/blogs",
      dataType: 'json',
      type: 'POST',
      data: {blog: blog},
      success: function(){
        window.location = "http://localhost:3000/";
      },
      error: function(xhr, status, err){
        alert(err);
      }
    });
  }

  handleEditBlog(blog){
    console.log(blog);
    $.ajax({
      url: "http://localhost:3001/blogs/" + blog.id,
      dataType: 'json',
      type: 'PUT',
      data: {blog},
      success: function(){
        window.location = "http://localhost:3000/";
                // window.location.reload(true) 
      },
      error: function(xhr, status, err){
        alert(err);
      }
    });
  }

  handleDeleteBlog(id){
    let destroyBlog = prompt('Are you sure you want to delete this blog? Type Y for yes!')
    if(destroyBlog === 'y'){
      $.ajax({
        url: "http://localhost:3001/blogs/" + id,
        dataType: 'json',
        type: 'DELETE',
        data: id,
        success: function(){
          window.location = "http://localhost:3000/";
        },
        error: function(xhr, status, err){
          alert(err);
        }
      });
    }
  }

  handleSubmit(e){
    if(this.refs.title.value === ''){
      alert('TITLE IS REQUIRED');
    } else {
      this.setState({newBlog:{
        title: this.refs.title.value,
        body: this.refs.body.value
      }}, function(){
        this.props.getBlogPosts(this.state.newBlog);
      });
    }
    e.preventDefault();
  }

  pagePagination(){
    let currentPage = this.state.page;
    this.setState({ page: currentPage += 1 });
    this.getBlogPosts();
  }

  componentWillMount(){
    this.setState({ blogs: [] });
    this.getBlogPosts();
    this.pagePagination();
  }

  render(){
    return ( 
      <div>
      <button onClick={this.pagePagination}>next</button>
        <BlogItems blogs={this.state.blogs} onDelete={this.handleDeleteBlog.bind(this)} onEdit={this.handleEditBlog.bind(this)} onNew={this.handleAddBlog.bind(this)}/>
      </div>
    );
  }
}