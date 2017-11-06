import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { EditBlog } from './EditBlog.js';

export class BlogItem extends Component {
  constructor(){
    super();
    this.state = { 
      blogdisplay: '',
      formdisplay: '',
      editbutton: ''
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.truncateBlog = this.truncateBlog.bind(this);
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

  truncateBlog(blogBody){
    if(blogBody.length > 200){
      return blogBody.substring(0, 200) + "...";
    }else{
      return blogBody;
    }
  }

  render(){
    const newTo = { pathname: '/blog/' + this.props.blog.id, blog: this.props.blog, title: this.props.blog.title, body: this.props.blog.body, onDelete: this.props.onDelete, onEdit: this.props.onEdit }
    return (
      <div>
        <div className='blog-link' >
          <div className='admin-options'>
            <button onClick={this.deleteBlog.bind(this, this.props.blog.id)}>Delete Blog {this.props.blog.title}</button>
            <button onClick={this.toggleDisplay } >{this.state.editbutton} {this.props.blog.title}</button>
          </div>
          <Link to={newTo } style={{ textDecoration: 'none', display:this.state.blogdisplay}} >
            <div className='blog-container'>
              <h3 className='blog-title'>{this.props.blog.title}</h3>
              <div name='blog-content' >
                <p>{this.truncateBlog(this.props.blog.body)}</p>
                <p>{this.props.blog.id}</p>
              </div>
            </div>
          </Link>
        </div>
        <div style={{display:this.state.formdisplay}}>
          <EditBlog blog={this.props.blog} editBlog={this.editBlog.bind(this)}/>
        </div>
      </div>
    );
  }
}
