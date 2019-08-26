// import fetch from 'isomorphic-unfetch'
import React, { useState, useEffect, useContext } from "react";
import NotesList from "./NotesList";
import SearchBare from "./SearchBare";
import NoteDisplay from "./NoteDisplay";
import NavBare from "./NavBare";
import ToolBar from "./ToolBar";
import NewNote from "./NewNote";

// import userContext from '../UserContext'

export default function Journal() {
    // const {user} = useContext(userContext)
    //  console.log('user context =', user)
    // const [user, setUser] = useState("5d63b8053815719539b66c02")
   
    const [username, setUsername] = useState('')
    const [noteId, setNoteId] = useState();
    const [noteListQuery, setNoteListQuery] = useState('');

    const [updateNoteId, setUpdateNoteId] = useState()
    const [updateText, setUpdateText] = useState()
    const [updateTitle, setUpdateTitle] = useState()

    const [showNewNote, setShowNewNote] = useState(false);
    const [updateNotes, setUpdateNotes] = useState(false);


  
     useEffect(()=>{        
        // console.log('user id', user)
        const getUsername = async ()=>{
          // if(!user) return         
           const res = await fetch(`/getUserInfos`)
           const json = await res.json();
           // // // console.log('json home =', json)
           setUsername(json.username)
        }
        getUsername()
     },[])
  
    const displayNote = id => {
      setNoteId(id);
    };

    const refrech = ()=>{
      setUpdateNotes(!updateNotes)
    }

    const newNote = () => {
     setShowNewNote(true);      
    };


    const closeNewNote = (id)=>{
      setShowNewNote(false)
      setUpdateNoteId(null);
      setUpdateText(null)
      setUpdateTitle(null);
      if (id) {
        setNoteId(id);
        refrech()
      }
    }

    const updateOneNote = ({id, text, title})=>{
      if(!id) return;
     setUpdateNoteId(id);
     setUpdateText(text)
     setUpdateTitle(title);
     setShowNewNote(true)
     refrech()
    }
   
    const setNoteListQueryfn = (query) =>{
      setNoteListQuery(query)
      // console.log('index query =', query)
    }
    // console.log('notelistQuery =', noteListQuery)
    return (
      
      <div>
        <NavBare username={username} setNoteListQuery={setNoteListQueryfn} />
        <div className="container">
          <ToolBar newNote={newNote}  showNewNote={showNewNote} />
          <div className='note-list'>
            <SearchBare  updateNotes={updateNotes}  setNoteListQuery={setNoteListQueryfn} />
            <NotesList  onClick={displayNote} updateNotes={updateNotes}  query={noteListQuery}/>
          </div>
          <NoteDisplay  className='display-note' noteId={noteId} refrech={refrech} updateOneNote={updateOneNote} updateNotes={updateNotes}/>
          {showNewNote && <NewNote  closeNewNote={closeNewNote}  noteId={updateNoteId} text={updateText} title={updateTitle} />}
        
         
        </div>
      </div>
    );
  }