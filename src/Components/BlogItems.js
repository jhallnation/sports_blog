import React, { Component } from 'react';
import { BlogItem } from './BlogItem.js';
import { Show } from '../Containers/Show.js';

export class BlogItems extends Component {
  constructor(){
    super();
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
    ? <Show blog={blog} onDelete={this.deleteBlog.bind(this)} onEdit={this.editBlog.bind(this)} showAll={this.onBlogClick} /> 
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
          <div style={{display:this.state.singleBlogDisplay}} key={ blog.id }>
            <div onClick={this.onBlogClick.bind(this, blog)}>
              <BlogItem blog={blog}/>
            </div>
          </div>
        );
      })
    }  
    return (
      <div> 
        <div>
          {BlogItems}
        </div>
        <div>
          {this.state.singleBlog}
        </div>
      </div>
    );
  }  
}
  
// onDelete={this.deleteBlog.bind(this)} 
//  onEdit={this.editBlog.bind(this)}
