import React from 'react';
import './notebutton.css';

const NoteButton = ({noteName}) => {
  return (
    <button className='note-button'>
        {noteName}
    </button>
  );
};

export default NoteButton;