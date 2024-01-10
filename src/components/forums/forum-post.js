import React from 'react';
import './forum-post.css';

const ForumPost = ({thread}) => {
  return (
    <tr className='forum-post-container'>
      <td className='topic-date-column'>
        <h4>"TITLE GOES HERE"</h4>
        <p className='date'>
            "9999-99-99"
        </p>
      </td>
      <td className='author-column'>
        <a href=''>
            "AUTHOR GOES HERE"
        </a>
      </td>
      <td className='replies-column'>
        "420"
      </td>
      <td className='reply-count-column'>
        "69"
      </td>
    </tr>
  );
}

export default ForumPost;