import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import { BlogItems } from '../Components/BlogItems';
import $ from 'jquery';

export class Blogs extends Component {
  constructor(){
    super();
    this.state = { 
      blogs: [],
      totalCount: 0,
      currentPage: 0
    };
    this.pageScroll = this.pageScroll.bind(this);
    this.getBlogPosts = this.getBlogPosts.bind(this);
    this.handleAddBlog = this.handleAddBlog.bind(this)
  }
 
  getBlogPosts(){
    $.ajax({
      url: "http://localhost:3000/api/sports-blog?page=" + (this.state.currentPage + 1),
      dataType: 'json',
      cache:false,
      success: function(data){
        this.setState({
          blogs: this.state.blogs.concat(data.blogs),
          currentPage: this.state.currentPage + 1,
          totalCount: data.meta.total_blogs,
        });
      }.bind(this),
      error: function(xhr, status, err){
        alert(err);
      }
    });
  }

  handleAddBlog(blog){
    $.ajax({
      url: "http://localhost:3000/api/sports-blog/new",
      dataType: 'json',
      type: 'POST',
      data: {blog: blog},
      success: data => {
        console.log(data);
        if (data.new_blog !== true) {
          console.error('Unable to create blog');
        } else {
          this.setState( { 
            blogs: [],
            totalCount: 0,
            currentPage: 0
          });
          this.getBlogPosts();
        }
      }
    }).catch(error => {
      console.error('Blog handleSubmit', error);
    });
  }

  handleEditBlog(blog){
    console.log(blog);
    $.ajax({
      url: "http://localhost:3000/api/sports-blogs/edit" + blog.id,
      dataType: 'json',
      type: 'PUT',
      data: {blog},
      success: function(){
        this.getBlogPosts();
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
        url: "http://localhost:3000/sports-blogs/delete" + id,
        dataType: 'json',
        type: 'DELETE',
        data: id,
        success: function(){
          this.getBlogPosts();
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

  pageScroll(){
    if (this.state.totalCount !== this.state.blogs.length) {
      this.getBlogPosts();
    }
  }

  componentWillMount(){
    this.getBlogPosts();
  }

  render(){

    return ( 
      <div>
        <BlogItems blogs={this.state.blogs} onDelete={this.handleDeleteBlog.bind(this)} onEdit={this.handleEditBlog.bind(this)} onNew={this.handleAddBlog}/>
        <Waypoint
          onEnter={this.pageScroll}
        />
      </div>
    );
  }
}