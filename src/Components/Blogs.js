import React, { Component } from 'react';
import { NewBlog } from './NewBlog.js';
import $ from 'jquery';
import '../App.css';

export class Blogs extends Component {
  constructor(){
    super();
    this.state = {
      blogs: [],
      display: ''
    };
    this.toggleDisplay.bind(this);
  }
  toggleDisplay() {
    const newDisplay = this.state.display === 'none' ? 'block' : 'none';
    this.setState({ display: newDisplay });
  }
  getBlogPosts(){
    $.ajax({
      url: "http://localhost:3001/blogs",
      dataType: 'json',
      cache:false,
      success: function(data){
        this.setState({blogs: data});
      }.bind(this),
      error: function(xhr, status, err){
        alert(err);
      }
    });
  }

  componentWillMount(){
    this.setState({blogs: [],
      display: 'none'
  });
    this.getBlogPosts();
  }
  componentDidMount(){
    this.getBlogPosts();
  }

  handleAddBlog(blog){
    let data = blog;
    console.log(data);
    $.ajax({
      url: "http://localhost:3001/blogs",
      dataType: 'json',
      type: 'POST',
      data: {blog: blog},
      success: function(data){
        alert('New Blog Created!');
      },
      error: function(xhr, status, err){
        alert(err);
      }
    });
  }

  render(){

    let Blog;
    if(this.state.blogs){
      // let display = {
      //   hidden: {display:"none"},
      //   visible: {display:"block"}
      // };


      Blog = this.state.blogs.map(function(BlogItem, index){
        // let handleClick = function(){
        //   var myElement = document.getElementsByName('blog-content');
        //   var currentStyle = myElement[index].style.getPropertyValue("display");
        //   if(currentStyle === 'none'){
        //     myElement[index].setAttribute('style', '{display["visible"]}');
        //     console.log(currentStyle);
        //   }else{
        //     myElement[index].setAttribute('style', '{display["hidden"]}');
        //     console.log(currentStyle);
        //   }
          // myElement[index].setAttribute('style', '{display["visible"]}');
        // }
                    return (
                      // <BlogItems BlogPost={BlogItem} key={ index } />
                      <div key={ index } >
                        <h3 onClick={toggleDisplay} className='blog-title'>{BlogItem.title}</h3>
                        <div name='blog-content' style={{display:this.state.display}}>
                          <p>{BlogItem.body}</p>
                          <p>{BlogItem.id}</p>
                        </div>
                      </div>
                    );
                  })
    }

    return ( 
      <div className='content-container'>
        <NewBlog addBlog={this.handleAddBlog.bind(this)} />
        {Blog}
      </div>
    );
  }
}

