import React from 'react';
import Truncate from 'react-truncate-html';
import { Link } from 'react-router-dom';

const BlogItem = props => {
  const {id, title, body} = props.blogItem;

  // truncateBlog(blogBody){
  //   if(blogBody.length > 200){
  //     return blogBody.substring(0, 200) + "...";
  //   }else{
  //     return blogBody;
  //   }
  // }

  return (
    <Link to={`/blog/${id}`} className='blog-link' >
        <div className='blog-container'>
          <h3 className='blog-title'>{title}</h3>
          <div className='blog-content' >
              <Truncate 
                lines={8} 
                portrait={10} 
                dangerouslySetInnerHTML={{__html: body }}
              />
          </div>
        </div>
    </Link>
  );
}

export default BlogItem;