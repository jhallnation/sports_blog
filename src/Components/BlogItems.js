import React, { Component } from 'react';
import { BlogItem } from './BlogItem.js';
import BlogPost from '../Containers/BlogPost.js';
import { BlogForm } from './BlogForm.js';

export class BlogItems extends Component {
  constructor(props){
    super(props);
    this.state = { 
      singleBlogDisplay: '',
      singleBlog: '',
      blogdisplay: '',
      formdisplay: '',
      editbutton: ''
     };
    this.onBlogClick = this.onBlogClick.bind(this);
  }

  componentWillMount(){
    this.setState({ 
      singleBlogDisplay: 'block',
      blogdisplay: 'block',
      formdisplay: 'none',
      editbutton: 'Edit Blog'
    });
  }

  deleteBlog(id){
    this.props.onDelete(id);
  }

  editBlog(blog){
    this.props.onEdit(blog);
  }

  onBlogClick(blog){
    const newBlogDisplay = this.state.singleBlogDisplay === 'block' ? 'none' : 'block';

    const newSignleBlog = this.state.singleBlog === '' 
    ? <BlogPost blog={blog} onDelete={this.deleteBlog.bind(this)} onEdit={this.editBlog.bind(this)} showAll={this.onBlogClick} /> 
    : '';

    this.setState({ 
      singleBlogDisplay: newBlogDisplay,
      singleBlog: newSignleBlog
    });
  }

  render(){
    let BlogItems;
    if(this.props.blogs){
      BlogItems = this.props.blogs.map(blog => {
        return (
          <div key={ blog.id }>
            <div onClick={this.onBlogClick.bind(this, blog)}>
              <BlogItem blog={blog}/>
            </div>
          </div>
        );
      })
    }  
    return (
      <div> 
        <div style={{display:this.state.singleBlogDisplay}} >

          <div>
            {BlogItems}
          </div>
        </div>
        <div>
          {this.state.singleBlog}
        </div>
      </div>
    );
  }  
}