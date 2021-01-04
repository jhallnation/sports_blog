import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {
  return (
    <div className='no-match'>
      <h2>We coudln't find the page you are looking for</h2>

      <Link to='/'>Return to Home</Link>
    </div>
  )
}