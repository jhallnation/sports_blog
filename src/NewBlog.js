import React, { Component } from 'react';

export class NewBlog extends Component {
  constructor(){
    super();
    this.state = { 
      newBlog: {}
    }
  }
  handleSubmit(e){
    if(this.refs.title.value === ''){
      alert('TITLE IS REQUIRED');
    } else {
      this.setState({newBlog:{
        title: this.refs.title.value,
        body: this.refs.body.value
      }}, function(){
        this.props.addBlog(this.state.newBlog);
      });
    }
    e.preventDefault();
  }
  render(){
    return ( 
      <div>
        <h4>New Blog</h4>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <label>Title</label><br />
            <input type='text' ref='title' />
          </div>
          <div>
            <label>Body</label><br />
            <textarea type='text' ref='body' />
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
