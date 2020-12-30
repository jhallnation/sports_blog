import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = { 
      email: '',
      password: '',
      errorText: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    axios.post(
      'http://localhost:3000/api/login',
      {
        email: this.state.email,
        password: this.state.password
      }
    ).then(res => {
      this.props.handleSuccessfulLogin();
      this.props.history.push('/');
      localStorage.setItem('token', res.data.authentication_token);
      localStorage.setItem('userEmail', res.data.email);
    }).catch(err => {
      if (err.response.status === 401) {
        this.setState({
          errorText: 'Only Admins can login at this time.  If you are an admin, your credentials are incorrect!'
        });
      } else if (err.response.status === 404) {
        this.setState({
          errorText: 'Request not found'
        });
        console.error(err);
      } else if (err.response.status === 500) {
        this.setState({
          errorText: 'Sorry, the server is unavailable'
        });
        console.error(err);
      } else {
        this.setState({
          errorText: 'Sorry, an unexpected error has occured'
        });
        console.error('ERROR', err);
      }
      this.props.handleUnsuccessfulLogin();
    });
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render(){
    return ( 
      <div>
        <h1 className='page-title'>Log In</h1>
        <hr />
        <div className='login-err'>{this.state.errorText}</div>
        <form className='login-form' onSubmit={this.handleSubmit}>
          <div className='login-input'>
            <label>Email Address</label>
            <input 
              type='email' 
              name='email'
              value={this.state.email}
              onChange={this.handleChange} 
            />
          </div>
          <div className='login-input'>
            <label>Password</label>
            <input 
              type='password' 
              name='password'
              value={this.state.password}
              onChange={this.handleChange} 
            />
          </div>
          <input className='submit' type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}