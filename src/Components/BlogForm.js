import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CKEditor from "react-ckeditor-component";
import axios from 'axios';

class BlogForm extends Component {
  constructor(props){
    super(props);
    this.state = { 
      title: '',
      body: '',
      display: 'none',
      editbutton: 'Edit Blog',
      newBlogBtn: 'Create New Blog',

      apiURL: 'http://localhost:3000/api/sports-blog/new',
      apiAction: 'post',
      editMode: false,
      requestHeaders: {
        'Authorization' : localStorage.getItem('token'),
        'jhUserEmail' : localStorage.getItem('userEmail'),
      },
    }

    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.handleDeleteBlog = this.handleDeleteBlog.bind(this);
  }

  handleSubmit(e){
    if(this.state.title.value === ''){
      alert('TITLE IS REQUIRED');
    } else {
      axios({
        method: this.state.apiAction,
        url: this.state.apiURL,
        data: this.buildForm(),
        headers: this.state.requestHeaders
      }).then(response => {
        if (response.data.new_edit_blog !== true) {
          console.error('Unable to create/edit blog');
        } else {
          if (this.state.editMode) {
            this.toggleDisplay();
            this.props.getBlogPost();
          } else {
            this.props.addBlog();
            this.setState({ 
              title: '',
              body: ''
            });
            this.toggleDisplay();
          }
        }}).catch(error => {
          console.error('Blog handleSubmit', error);
      });
    }
    e.preventDefault();
  }

  onBodyChange(evt){
    this.setState({
      body: evt.editor.getData() 
    });
  }

  onTitleChange(evt){
    this.setState({
      title: evt.target.value,
    });
  }

  buildForm() {
    let formData = new FormData();

    formData.append('blog[title]', this.state.title);
    formData.append('blog[body]', this.state.body);

    return formData;
  }

  componentDidMount(){
    if (this.props.editMode) {
      this.setState({ 
        title: this.props.blog.title,
        body: this.props.blog.body,
        editMode: this.props.editMode,
        apiURL: 'http://localhost:3000/api/sports-blog/edit',
        apiAction: 'patch',
        requestHeaders: {
          'sportsBlogPostID': this.props.blog.id,
          'Authorization' : localStorage.getItem('token'),
          'jhUserEmail' : localStorage.getItem('userEmail'),
        }
      });
    }
  }

  toggleDisplay() {
    const displayForm = this.state.display === 'none' ? 'block' : 'none';
    const changeNewBlogBtn = this.state.newBlogBtn === 'Create New Blog' ? 'Close Form' : 'Create New Blog';
    const changeEditBtn = this.state.editbutton === 'Edit Blog' ? 'Close Form' : 'Edit Blog';
    this.setState({ display: displayForm });
    if (this.state.editMode) {
      this.setState({ editbutton: changeEditBtn });
      this.props.toggleDetailDisplay();
    } else {
        this.setState({ newBlogBtn: changeNewBlogBtn });
    }
  }

  handleDeleteBlog(){
    let destroyBlog = prompt('Are you sure you want to delete this blog? Type Y for yes!')
    if(destroyBlog === 'y' || destroyBlog === 'Y'){
      axios({
        url: 'http://localhost:3000/api/sports-blog/delete',
        method: 'delete',
        headers: this.state.requestHeaders
      }).then(response => {
        if (response.data.delete_blog !== true) {
          console.error('Unable to delete blog');
        } else {
          this.props.history.push('/');
        }
      }).catch(error => {
        console.error('Blog getBlogPosts', error);
      });
    }
  }

  render(){
    return ( 
      <div>
          {this.state.editMode ? (
            <div className='admin-options'>
                <button className='admin-btn' onClick={this.handleDeleteBlog}>Delete Blog</button>
                <button className='admin-btn' onClick={this.toggleDisplay}>{this.state.editbutton}</button>
            </div>
          ) : (
            <div className='admin-options'>
              <button className='admin-btn' onClick={this.toggleDisplay}>{this.state.newBlogBtn}</button>
            </div>
          )}
        <form className='blog-form' onSubmit={this.handleSubmit.bind(this)} style={{display:this.state.display}} >
          <div>
            <label>Title</label>
            <input 
              className='blog-title-box' 
              type='text'
              onChange={this.onTitleChange}
              value={this.state.title} 
            />
          </div>
          <div>
            <label>Body</label>
            <CKEditor 
              content={this.state.body}
              events={{
                "change": this.onBodyChange
              }} />
          </div>
          <input className='submit' type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(BlogForm);
