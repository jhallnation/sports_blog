import React, { Component } from 'react';
import Truncate from 'react-truncate-html';

export class BlogItem extends Component {
  constructor(){
    super();
    this.truncateBlog = this.truncateBlog.bind(this);
  }

  truncateBlog(blogBody){
    if(blogBody.length > 200){
      return blogBody.substring(0, 200) + "...";
    }else{
      return blogBody;
    }
  }


  render(){
    return (
      <div className='blog-link' >
          <div className='blog-container'>
            <h3 className='blog-title'>{this.props.blog.title}</h3>
            <div name='blog-content' >
              <Truncate 
                lines={8} 
                portrait={10} 
                dangerouslySetInnerHTML={{__html: this.props.blog.body }}
              />
            </div>
          </div>
      </div>
    );
  }
}