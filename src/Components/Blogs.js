import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import BlogItem from './BlogItem.js';
import BlogForm from './BlogForm.js';
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