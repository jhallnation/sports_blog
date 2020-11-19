import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import BlogItem from './BlogItem.js';
import BlogForm from './BlogForm.js';
import $ from 'jquery';
import axios from 'axios';

export class Blogs extends Component {
  constructor(props){
    super(props);
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
    axios({
      url: "http://localhost:3000/api/sports-blog?page=" + (this.state.currentPage + 1),
      method: 'get',
    }).then(response => {
      this.setState({
        blogs: this.state.blogs.concat(response.data.blogs),
        currentPage: this.state.currentPage + 1,
        totalCount: response.data.meta.total_blogs,
      });
    }).catch(error => {
      console.error('Blog getBlogPosts', error);
    });
  }

  handleAddBlog(blog){  
    this.setState({ 
      blogs: [],
      totalCount: 0,
      currentPage: 0
    });
    this.getBlogPosts();
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

  // handleSubmit(e){
  //   if(this.refs.title.value === ''){
  //     alert('TITLE IS REQUIRED');
  //   } else {
  //     this.setState({newBlog:{
  //       title: this.refs.title.value,
  //       body: this.refs.body.value
  //     }}, function(){
  //       this.props.getBlogPosts(this.state.newBlog);
  //     });
  //   }
  //   e.preventDefault();
  // }

  pageScroll(){
    if (this.state.totalCount !== this.state.blogs.length) {
      this.getBlogPosts();
    }
  }

  componentWillMount(){
    this.getBlogPosts();
  }

  render(){
    const blogItems = this.state.blogs.map(blogItem => {

      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });

    console.log(blogItems);



    return ( 
      <div>
        <div>
          <BlogForm addBlog={this.handleAddBlog} />
        </div>
        {blogItems}
        <Waypoint
          onEnter={this.pageScroll}
        />
      </div>
    );
  }
}