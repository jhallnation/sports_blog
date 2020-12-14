import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import axios from 'axios';

export default class BlogForm extends Component {
  constructor(props){
    super(props);
    this.state = { 
      title: '',
      body: '',
      display: 'none',
      editbutton: 'Edit',

      apiURL: 'http://localhost:3000/api/sports-blog/new',
      apiAction: 'post',
      editMode: false,
      requestHeaders: {}
    }

    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.onBodyChange = this.onBodyChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
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
        requestHeaders: {'sportsBlogPostID': this.props.blog.id }
      });
    }
  }

  toggleDisplay() {
    const displayForm = this.state.display === 'none' ? 'block' : 'none';
    this.setState({ display: displayForm });
    if (this.state.editMode) {
      this.setState({ editbutton: 'Cancel Edit for' });
      this.props.toggleDetailDisplay();
    }
  }

  render(){
    return ( 
      <div>
          {this.state.editMode ? (
            <div className='admin-options'>
                <button>Delete {this.state.title}</button>
                <button onClick={this.toggleDisplay}>{this.state.editbutton} {this.state.title}</button>
            </div>
          ) : (
            <div className='admin-options'>
              <button onClick={this.toggleDisplay}>Create New Blog</button>
            </div>
          )}
        <form className='blog-form' onSubmit={this.handleSubmit.bind(this)} style={{display:this.state.display}} >
          <div>
            <label>Title</label><br />
            <input 
              className='blog-title-box' 
              type='text'
              onChange={this.onTitleChange}
              value={this.state.title} 
            />
          </div>
          <div>
            <label>Body</label><br />
            <CKEditor 
              content={this.state.body}
              events={{
                "change": this.onBodyChange
              }} />
          </div>
          <input className='blog-submit' type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
