import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import BlogItem from '../Components/BlogItem.js';
import BlogForm from '../Components/BlogForm.js';
import axios from 'axios';

export default class Blogs extends Component {
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

      return <BlogItem key={blogItem.id} blogItem={blogItem} loggedInStatus={this.props.loggedInStatus}/>;
    });

    return ( 
      <div className='content-container'>
        <h1 className='page-title'>Blog</h1>
        {this.props.loggedInStatus === 'LOGGED_IN' ? (
          <div>
            <BlogForm addBlog={this.handleAddBlog} />
          </div>
        ) : null }
        {blogItems}
        <Waypoint
          onEnter={this.pageScroll}
        />
      </div>
    );
  }
}