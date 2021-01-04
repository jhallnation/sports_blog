import React, { Component } from 'react';
import axios from 'axios';
import BlogForm from '../Components/BlogForm.js';
import ReactHtmlParser from 'react-html-parser';

export default class BlogPost extends Component {
  constructor(props){
    super(props);
    this.state = { 
      blogPostID: this.props.match.params.slug,
      blogPost: {},
      blogdisplay: 'block',
      formdisplay: 'none'
    }

    this.toggleDetailDisplay = this.toggleDetailDisplay.bind(this);
    this.getBlogPost = this.getBlogPost.bind(this);
  }

  toggleDetailDisplay() {
    const display = this.state.blogdisplay === 'none' ? 'block' : 'none';
    
    this.setState({ 
      blogdisplay: display,
    });
  }

  deleteBlog(id){
    this.props.onDelete(id);
    // move over from blogs.js
  }

  editBlog(blog){
    this.props.onEdit(blog);
  }

  getBlogPost(){
    axios({
      url: "http://localhost:3000//api/sports-blog/post",
      method: 'get',
      headers: {
        'sportsBlogPostID': this.state.blogPostID
      }
    }).then(response => {
      this.setState({
        blogPost: response.data
      });
    }).catch(error => {
      console.error('Blog getBlogPosts', error);
    });
  }

  componentDidMount(){
    this.getBlogPost();
  }

  render(){
    const {title, body} = this.state.blogPost;
    return Object.keys(this.state.blogPost).length !== 0 ? ( 
        <div>
          {this.props.loggedInStatus === 'LOGGED_IN' ? (
            <BlogForm blog={this.state.blogPost} editMode={true} toggleDetailDisplay={this.toggleDetailDisplay} getBlogPost={this.getBlogPost}/>
          ) : null}
          <div className='blog-container' style={{display:this.state.blogdisplay}}>
            <h3 className='blog-title'>{title}</h3>
            <div className='blog-content' >
              <div>{ReactHtmlParser(body)}</div>
            </div>
          </div>
        </div>
    ) : (
      <div>
        Loading ...
      </div>
    );
  }
}
