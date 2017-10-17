import React, { Component } from 'react';
import { NewBlog } from './NewBlog.js';
import $ from 'jquery';

export class Blogs extends Component {
  constructor(){
    super();
    this.state = {
      blogs: []
    }
  }

  getBlogPosts(){
    $.ajax({
      url: "http://localhost:3001/blogs",
      dataType: 'json',
      cashe:false,
      success: function(data){
        this.setState({blogs: data}, function(){
          console.log(this.state);
        })
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
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
    let blogs = this.state.blogs;
    blogs.push(blog);
    this.setState({blogs:blogs});
  }

  render(){
    let Blog;
    if(this.state.blogs){
      Blog = this.state.blogs.map(function(BlogItem, index){
                    return (
                      // <BlogItems BlogPost={BlogItem} key={ index } />
                      <div key={ index } >
                        <h3>{BlogItem.title}</h3>
                        <p>{BlogItem.body}</p>
                      </div>
                    );
                  })
    }

    return ( 
      <div>
        <NewBlog addBlog={this.handleAddBlog.bind(this)} />
        {Blog}
      </div>
    );
  }
}

