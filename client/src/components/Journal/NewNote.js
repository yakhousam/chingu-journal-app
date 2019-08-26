import { useState } from "react";
// import fetch from "isomorphic-unfetch";
import  React from 'react'

const NewNote = props => {
  // console.log("closeNewNote props =", props.title);
  const [formData, setForm] = useState({
    title: props.title || "",
    text: props.text || ""
  });

  const addNote = async () => {
    const res = await fetch(
      `api/addNote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: formData.title, text: formData.text })
      }
    );
    const json = await res.json();
    // console.log("closeNewNote json.id =", json._id);

    setForm({ title: "", text: "" });
    props.closeNewNote(json.noteId);
  };

  const updateNote = async () => {
    const res = await fetch(`api/updateNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        noteId: props.noteId,
        title: formData.title,
        text: formData.text
      })
    });
    const json = await res.json();
    // console.log("Update json.id ---------------------=", json);    

    setForm({ title: "", text: "" });
    props.closeNewNote(json.noteId);
  };

  const handelChange = e => {
    const { name, value } = e.target;
    setForm({ ...formData, [name]: value });
  };

  return (
    <div className="new-note">
      <form>
        <button className="btn-close" onClick={() => props.closeNewNote()}>
          close
        </button>
        <h1>new note</h1>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={formData.title}
          onChange={handelChange}
        />
        <textarea name="text" value={formData.text} onChange={handelChange} />
        {!props.noteId && (
          <input type="button" value="add note" onClick={addNote} />
        )}
        {props.noteId && (
          <input type="button" value="Update note" onClick={updateNote} />
        )}
      </form>

     
    </div>
  );
};

export default NewNote;
