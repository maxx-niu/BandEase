import React from 'react';
import './fretboard.css';
import { naturalNotes, sharpNotes, flatNotes, allNotesSharp, allNotesFlat } from './notes';

const Fretboard = () => {

  const generateFretBoardTable = (useSharps = true) => {
    const fretRows = [];
    for(let i = 0; i < 6; i++){
        const fretCells = [];
        for(let j = 0; j < 14; j++){
            if(i >= 4){
                fretCells.push(
                    <td key={j} className="fret-cell">
                        {useSharps ? allNotesSharp[(5*i + j - 1) % 12] : allNotesFlat[(5*i + j - 1) % 12]}
                    </td>
                )
            }
            else {
                fretCells.push(
                    <td key={j} className="fret-cell">
                        {useSharps ? allNotesSharp[(5*i + j) % 12] : allNotesFlat[(5*i + j) % 12]}
                    </td>
                )
            } 
        }
        fretRows.push(
            <tr key={i}>
                {fretCells}
            </tr>
        )
    }
    return fretRows;
  }

  return (
    <>
      <table className="guitar-fretboard" border="1">
        <tbody>
            {generateFretBoardTable()}
        </tbody>
      </table>
    </>
  )
}

export default Fretboard;