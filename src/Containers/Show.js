import React, { Component } from 'react';
import { EditBlog } from '../Components/EditBlog.js';

export class Show extends Component {
  constructor(){
    super();
    this.state = { 
      blogdisplay: '',
      formdisplay: '',
      editbutton: ''
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentWillMount(){
    this.setState({ 
      blogdisplay: 'block',
      formdisplay: 'none',
      editbutton: 'Edit Blog'
    });
  }

  toggleDisplay() {
    const newBlogDisplay = this.state.blogdisplay === 'none' ? 'block' : 'none';
    const newFormDisplay = this.state.formdisplay === 'block' ? 'none' : 'block';
    const changeEditButton = this.state.editbutton === 'Edit Blog' ? 'Cancel Edit for' : 'Edit Blog';
    this.setState({ 
      blogdisplay: newBlogDisplay,
      formdisplay: newFormDisplay,
      editbutton: changeEditButton
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
          <div className='admin-options'>
            <button onClick={this.deleteBlog.bind(this, this.props.blog.id)}>Delete Blog {this.props.blog.title}</button>
            <div onClick={this.props.showAll}>See All Blogs</div>
            <button onClick={this.toggleDisplay } >{this.state.editbutton} {this.props.blog.title}</button>
          </div>
          <div className='blog-container' style={{display:this.state.blogdisplay}}>
            <h3 className='blog-title'>{this.props.blog.title}</h3>
            <div name='blog-content' >
              <p>{this.props.blog.body}</p>
              <p>{this.props.blog.id}</p>
            </div>
          </div>
          <div style={{display:this.state.formdisplay}}>
            <EditBlog blog={this.props.blog} editBlog={this.editBlog.bind(this)}/>
          </div>
        </div>
    );
  }
}
