import React from 'react';
import './fretboard.css';
import { naturalNotes, sharpNotes, flatNotes, allNotesSharp, allNotesFlat } from './notes';
import NoteButton from './notebutton';

const Fretboard = () => {

  const generateFretBoardTable = (useSharps = true) => {
    const fretRows = [];

    const fretMarkers = [3, 5, 7, 9]; // Single markers
    const doubleFretMarker = 12;
    for(let i = 0; i < 6; i++){
        const fretCells = [];
        for(let j = 0; j < 14; j++){
            const markerClass = fretMarkers.includes(j) ? 'fret-marker' : '';
            const doubleMarkerClass = j === doubleFretMarker ? 'double-fret-marker' : '';
            if(i >= 4){ // for B & high E strings, since G --> B is a M3, not a P4 apart
                const note = useSharps ? allNotesSharp[(5*i + j - 1) % 12] : allNotesFlat[(5*i + j - 1) % 12];
                fretCells.push(
                    <td key={j} className={`fret-cell string-${i} fret-${j} ${markerClass} ${doubleMarkerClass}`}>
                        <NoteButton noteName={note} className="note-button"></NoteButton>
                    </td>
                )
            }
            else {
                const note = useSharps ? allNotesSharp[(5*i + j) % 12] : allNotesFlat[(5*i + j) % 12];
                fretCells.push(
                    <td key={j} className={`fret-cell string-${i} fret-${j} ${markerClass} ${doubleMarkerClass}`}>
                        <NoteButton noteName={note} className="note-button"></NoteButton>
                    </td>
                )
            } 
        }
        fretRows.unshift(
            <tr key={i} className="fretboard-string" data-string-thickness={6-i}>
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