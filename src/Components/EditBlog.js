import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";

export class EditBlog extends Component {
  constructor(){
    super();
    this.state = { 
      editBlog: {
        title: '',
        body: ''
      }
    }
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount(){
    this.setState({
        editBlog: Object.assign(
          {}, 
          this.state.editBlog,
          { 
            title: this.props.blog.title,
            body: this.props.blog.body,
          }
        )
    })
  }

  onChange(evt){
    var newContent = evt.editor.getData();
    this.setState({ editBlog: { body: newContent }});
  }

  handleSubmit(e){
    console.log(e);
    if(this.refs.title.value === ''){
      alert('TITLE IS REQUIRED');
    } else {
      this.setState({editBlog:{
        title: this.refs.title.value,
        body: this.state.editBlog.body,
        id: this.props.blog.id
      }}, function(){
        this.props.editBlog(this.state.editBlog);
      });
    }
    e.preventDefault();
  } 

  render(){
    return ( 
      <div>
        <form className='blog-form' onSubmit={this.handleSubmit.bind(this)} >
          <div>
            <label>Title</label><br />
            <input className='blog-title-box' type='text' ref='title'defaultValue={this.props.blog.title} />
          </div>
          <div>
            <label>Body</label><br />
            <CKEditor 
              content={this.state.editBlog.body}
              events={{
                "change": this.onChange
              }} />
          </div>
          <input className='blog-submit' type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}