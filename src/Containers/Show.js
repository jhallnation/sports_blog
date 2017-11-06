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
    this.props.location.onDelete(id);
  }

  editBlog(blog){
    this.props.location.onEdit(blog);
  }

  render(){
    return ( 
      <div>
        <div>
          <div className='admin-options'>
            <button onClick={this.deleteBlog.bind(this, this.props.match.params.id)}>Delete Blog {this.props.location.title}</button>
            <button onClick={this.toggleDisplay}>{this.state.editbutton} {this.props.location.title}</button>
          </div>
          <div className='blog-container' style={{ display:this.state.blogdisplay}} >
            <h3 className='blog-title'>{this.props.location.title}</h3>
            <div name='blog-content' >
              <p>{this.props.location.body}</p>
              <p>{this.props.match.params.id}</p>
            </div>
          </div>
        </div>
        <div style={{display:this.state.formdisplay}}>
            <EditBlog blog={this.props.location.blog} editBlog={this.editBlog.bind(this)}/>
        </div>
      </div>
    );
  }
}
