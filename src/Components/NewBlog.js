import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";

export class NewBlog extends Component {
  constructor(){
    super();
    this.state = { 
      newBlog: {
        title: '',
        body: ''
      },
      display: '' 
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  handleSubmit(e){
    if(this.refs.title.value === ''){
      alert('TITLE IS REQUIRED');
    } else {
      this.setState({newBlog:{
        title: this.refs.title.value,
        body: this.state.newBlog.body
      }}, function(){
        this.props.addBlog(this.state.newBlog);
      });
    }
    e.preventDefault();
  }

  onChange(evt){
    var newContent = evt.editor.getData();
    this.setState({
        newBlog: Object.assign(
          {}, 
          this.state.newBlog,
          { body: newContent }
        )
    })
  }

  componentWillMount(){
    this.setState({ display: 'none' });
  }

   toggleDisplay() {
    const newDisplay = this.state.display === 'none' ? 'block' : 'none';
    this.setState({ display: newDisplay });
  }

  render(){
    return ( 
      <div>
        <h4 className='new-blog-header' onClick={this.toggleDisplay } >New Blog</h4>
        <form className='blog-form' onSubmit={this.handleSubmit.bind(this)} style={{display:this.state.display}} >
          <div>
            <label>Title</label><br />
            <input className='blog-title-box' type='text' ref='title' />
          </div>
          <div>
            <label>Body</label><br />
            <CKEditor 
              content={this.state.newBlog.body}
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
