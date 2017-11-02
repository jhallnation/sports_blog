import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class BlogItem extends Component {
  render(){
    const newTo = { pathname: '/blog/' + this.props.blog.id, param1: this.props.blog.title, param2: this.props.blog.body }
    return (
      <div className='blog-link' >
        <Link to={newTo } style={{ textDecoration: 'none' }}>
          <div className='blog-container'>
            <h3 className='blog-title'>{this.props.blog.title}</h3>
            <div name='blog-content' >
              <p>{this.props.blog.body}</p>
              <p>{this.props.blog.id}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
