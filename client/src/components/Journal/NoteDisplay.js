import { useState, useEffect } from "react";
// import fetch from "isomorphic-unfetch";
import  React from 'react'

export default function Note(props) {
  // console.log('props note=', props.noteId)
  const [note, setNote] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false)
  
  const [quoteText, setQuoteText] = useState('')
  const [author, setAuthor] = useState('')
  useEffect(() => {
    // console.log('useEffect noteDisplay')
    const getnote = async () => {
      if (!props.noteId ) return;
      const res = await fetch(`api/getNote/${props.noteId}`);
      const json = await res.json();
       // console.log('json note one=', json)
      //  console.log('useEffect noteDisplay 22222')
      setNote(json);
      setConfirmDelete(false)
    };
    getnote();
  },[props.updateNotes, props.noteId]);

  // useEffect(()=>{
  //   const getQuoteOfTheDay = async ()=>{
  //     // const res = await fetch('http://quotes.rest/qod.json?category=inspire');
  //     const res = await fetch('api/getDayQuote')
  //   const json = await res.json()
  //   console.log('quote json =', json)
  //  if(!json.contents) return
  //   setQuoteText(json.contents.quotes[0].quote)
  //   setAuthor(json.contents.quotes[0].author)
  //   }
  //   getQuoteOfTheDay();
  // },[])

  const deleteNote = async (noteId) =>{
    if(!noteId) return
    const res = await fetch(`api/deleteNote/${noteId}`)
    const json = await res.json();
    // console.log('browser delete note =', res.status)
    if(json.noteId === noteId){
      setNote(null)
      props.refrech();
    }    
  }

  const updateNote = async (id) => {
    props.updateOneNote({id, text: note.text, title: note.title})
  }
   
  return (
    <>
    {note && <div className="note-display">
        <h1>{note.title}</h1>
        <p>{note.text}</p>
        <div className='btn-tool-container'>
         {!confirmDelete && <button className='btn btn-edit' onClick={()=> updateNote(props.noteId)}>edit</button>}
         {!confirmDelete && <button className='btn btn-delete' onClick={()=> setConfirmDelete(true)}>delete</button>}
         {confirmDelete && <button className='btn btn-delete' onClick={()=> deleteNote(props.noteId)}> comfirm delete</button>}
         {confirmDelete && <button className='btn btn-cancel' onClick={()=> setConfirmDelete(false)}>cancel</button>}
        </div>       
      </div>}
      {!note && <div className='note-display'>
        <h1 className='title'>{quoteText && 'Quote of the day'}</h1>
        <p className='quote-text'>{quoteText} </p>
        <h2 className='author'>{author} </h2>

      </div>}
      </>
   
  );
  
}
