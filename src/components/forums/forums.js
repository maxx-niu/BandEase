import React from 'react'
import { NavLink } from 'react-router-dom';
import './forums.css';

const Forums = () => {
  
  const forumTabTopics = [
    "Top Posts", "Technique", "Song Writing", "Looking for Collabs", "Theory", "Gear", "Technical Issues & Bugs", "Dev Updates"
  ]

  return (
    <div>
      <div>
        <nav>
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
      </div>
    </div>
  )
}

export default Forums