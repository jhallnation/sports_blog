import React, { Component } from 'react';
import $ from 'jquery';

export default class User extends Component {
  constructor(props){
    super(props);
    this.state = { 
      user: [],
      userToken: ''
    };
  }

  getToken(user){
    $.ajax({
      url: "http://localhost:3002/sessions",
      dataType: 'json',
      type: 'POST',
      data: {
        email: user.email,
        password: user.password
      },
      success: function(data){
        this.setState({userToken: data});
        console.log(this.state.userToken.authentication_token)
      }.bind(this),
      error: function(xhr, status, err){
        alert(err);
      }
    });
  }

  handleSubmit(e){
    if(this.refs.email.value === '' || this.refs.password.value === ''){
      alert('Email or Password Missing!');
    } else {
      this.setState({user:{
        email: this.refs.email.value,
        password: this.refs.password.value
      }}, function(){
        this.getToken(this.state.user);
      });
    }
    e.preventDefault();
  }

  render(){
    return ( 
      <div>
        <h1 className='page-title'>Log In</h1>
        <hr />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email Address</label>
          <input type='text' ref='email'></input>
          <label>Password</label>
          <input type='text' ref='password'></input>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}