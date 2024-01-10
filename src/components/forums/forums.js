import React from 'react'
import { NavLink } from 'react-router-dom';
import './forums.css';
import { Data } from './dummy-data';
import ForumPost from './forum-post';

const Forums = () => {
  
  const forumTabTopics = [
    "Top Posts", "Course Discussion", "Theory", "Technique", "Song Writing", "Looking for Collabs", "Gear", "Technical Topics", "Dev Updates"
  ];

  return (
    <div>
      <nav className='forum-nav-menu'>
        <ul className='forum-nav-bar'>
          <li><input type="text" placeholder="Search Discussions" /></li>
          {forumTabTopics.map((item, index) => {
            return (
            <li key={index}>
              <div className='forum-topic-tab'>
                <NavLink to={`/forums/${item}`}>{item}</NavLink>
              </div>
            </li>);
          })}
        </ul>
      </nav>
      <table className='thread-list'>
        <thead className='thread-list-header'>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Replies</th>
            <th>Upvotes</th>
          </tr>
        </thead>
        <tbody className='thread-body'>
          {/* TODO: Iteratively generate forum post elements */}
          <ForumPost></ForumPost>
        </tbody>
      </table>
    </div>
  );
}

export default Forums;