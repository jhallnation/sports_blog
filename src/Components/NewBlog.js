import React, { Component } from 'react';

export class NewBlog extends Component {
  constructor(){
    super();
    this.state = { 
      newBlog: {},
      display: '' 
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
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
            <textarea className='blog-body-box' type='text' ref='body' />
          </div>
          <input className='blog-submit' type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
