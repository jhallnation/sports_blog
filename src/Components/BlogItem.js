import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { EditBlog } from './EditBlog.js';

export class BlogItem extends Component {
  constructor(){
    super();
    this.state = { 
      blogdisplay: '',
      formdisplay: ''
    }
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }
  componentWillMount(){
    this.setState({ 
      blogdisplay: 'block',
      formdisplay: 'none'
    });
  }

  toggleDisplay() {
    const newBlogDisplay = this.state.blogdisplay === 'none' ? 'block' : 'none';
    const newFormDisplay = this.state.formdisplay === 'block' ? 'none' : 'block';
    this.setState({ 
      blogdisplay: newBlogDisplay,
      formdisplay: newFormDisplay
    });
  }

  deleteBlog(id){
    this.props.onDelete(id);
  }

  render(){
    const newTo = { pathname: '/blog/' + this.props.blog.id, param1: this.props.blog.title, param2: this.props.blog.body, param3: this.props.onDelete }
    return (
      <div>
        <div className='blog-link' >
          <div>
            <button onClick={this.deleteBlog.bind(this, this.props.blog.id)}>Delete Blog {this.props.blog.title}</button>
            <button onClick={this.toggleDisplay } >Edit Blog</button>
          </div>
          <Link to={newTo } style={{ textDecoration: 'none', display:this.state.blogdisplay}} >
            <div className='blog-container'>
              <h3 className='blog-title'>{this.props.blog.title}</h3>
              <div name='blog-content' >
                <p>{this.props.blog.body}</p>
                <p>{this.props.blog.id}</p>
              </div>
            </div>
          </Link>
        </div>
        <div style={{display:this.state.formdisplay}}>
          <EditBlog blog={this.props.blog} />
        </div>
      </div>
    );
  }
}
