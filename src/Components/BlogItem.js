import React from 'react';
import Truncate from 'react-truncate';
import striptags from 'striptags';
import { Link } from 'react-router-dom';

const BlogItem = props => {
  const {id, title, body} = props.blogItem;

  return (
    <Link to={`/blog/${id}`} className='blog-link'>
        <div className='blog-container'>
          <h3 className='blog-title'>{title}</h3>
          <div className='blog-content' >
            <Truncate 
              lines={5} 
              ellipsis={
                <span className='read-more'>
                  ...Read More
                </span>
              }
            >
              {striptags(body)}
            </Truncate>
          </div>
        </div>
    </Link>
  );
}

export default BlogItem;