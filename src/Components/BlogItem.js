import React, { Component } from 'react';

export class BlogItem extends Component {
  constructor(){
    super();
    this.state = { display: '' };
    this.toggleDisplay = this.toggleDisplay.bind(this);
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
        <h3 onClick={this.toggleDisplay } className='blog-title'>{this.props.blog.title}</h3>
        <div name='blog-content' style={{display:this.state.display}} >
          <p>{this.props.blog.body}</p>
          <p>{this.props.blog.id}</p>
        </div>
      </div>
    );
  }
}
