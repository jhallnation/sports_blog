import React, { Component } from 'react';
import BlogForm from '../Components/BlogForm.js';

export default class BlogPost extends Component {
  constructor(props){
    super(props);
    this.state = { 
      blogdisplay: 'block',
      formdisplay: 'none',
      editMode: true
    }
    this.toggleDetailDisplay = this.toggleDetailDisplay.bind(this);
  }

  toggleDetailDisplay() {
    const display = this.state.blogdisplay === 'none' ? 'block' : 'none';
    
    this.setState({ 
      blogdisplay: display,
    });
  }

  deleteBlog(id){
    this.props.onDelete(id);
  }

  editBlog(blog){
    this.props.onEdit(blog);
  }

  render(){
    return ( 
        <div>
          <BlogForm blog={this.props.blog} editMode={this.state.editMode} toggleDetailDisplay={this.toggleDetailDisplay}/>
          <div className='blog-container' style={{display:this.state.blogdisplay}}>
            <h3 className='blog-title'>{this.props.blog.title}</h3>
            <div name='blog-content' >
              <div dangerouslySetInnerHTML={{__html: this.props.blog.body}} />
            </div>
          </div>
        </div>
    );
  }
}
