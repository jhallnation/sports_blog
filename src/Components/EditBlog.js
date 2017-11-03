import React, { Component } from 'react';

export class EditBlog extends Component {
  // handleSubmit(e){
  //   if(this.refs.title.value === ''){
  //     alert('TITLE IS REQUIRED');
  //   } else {
  //     this.setState({newBlog:{
  //       title: this.refs.title.value,
  //       body: this.refs.body.value
  //     }}, function(){
  //       this.props.editBlog(this.state.newBlog);
  //     });
  //   }
  //   e.preventDefault();
  // } this.handleSubmit.bind(this)

  render(){
    return ( 
      <div>
        <form className='blog-form' onSubmit={console.log(this)} >
          <div>
            <label>Title</label><br />
            <input className='blog-title-box' type='text' ref='title'defaultValue={this.props.blog.title} />
          </div>
          <div>
            <label>Body</label><br />
            <textarea className='blog-body-box' type='text' ref='body' defaultValue={this.props.blog.body}  />
          </div>
          <input className='blog-submit' type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}