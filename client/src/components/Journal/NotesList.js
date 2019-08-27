import React, { useEffect, useState } from "react";
// import fetch from "isomorphic-unfetch";


export default function Notes(props) {
  // console.log('entries entries')
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function getNotes() {
      try {
         console.log('note list useeffect = ', props.query )
         const res = await fetch(`api/getListeNotes/${props.query || ''}`);      
        const json = await res.json();
        // console.log("getNotes notes=", json);
        // console.log('userId =', props.userId)
        setNotes(json);
      } catch (error) {
        console.error(error);
      }
    }
    getNotes();
  }, [props.updateNotes, props.userId, props.query]);
  const listNotes = notes.map((note) => {
    // // console.log('notes id =', note.id)
    return (
      <div className="note-item" key={note._id} onClick={() => props.onClick(note._id)}>
        <div>
        <h2>{note.title}</h2>        
        <p>{note.text}</p>
        </div>
        <div>
          <div className='date-day'>{new Date(note.date_create).getDate()}</div>
          <div className='date-month'>{`${new Date(note.date_create).getFullYear()}-${new Date(note.date_create).getMonth() + 1}`}</div>
        </div>
        
        
      </div>
    );
  });
  return (
    <div className="note-list">
      {listNotes}
     
    </div>
  );

}
