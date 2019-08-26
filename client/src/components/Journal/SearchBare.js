import { useState, useEffect } from "react";
// import fetch from "isomorphic-unfetch";
import  React from 'react'


export default function SearchBare(props) {
  const [titles, setTitles] = useState([]);
  const [search, setSearch] = useState([]);
  useEffect(() => {
    // console.log('search bare use effect')
    const getTitles = async() => {
      if(!props.userId) return 
      const res = await fetch(`api/getNotesTitles`);
      const json = await res.json();
      const titles = json.map(title => title.title)
      // console.log('searchbare =', titles)
      setTitles(titles);
    };
    getTitles();
    
  },[props.updateNotes]);

  const handleChange = (e)=>{
    setSearch(e.target.value)
  }
  const doSearch = (e)=>{
    e.preventDefault();
    if(!search) return;
    const query = `?title=${search}`
    props.setNoteListQuery(query)
    setSearch('')
  }
  return (
    <div className="search">
      <form onSubmit={doSearch}>
        <input list="list-titles" placeholder="Search Entries" value={search} onChange={handleChange}/>
        <datalist id="list-titles">
           {titles.map((title, i)=> <option key={i} value={title}></option>)}
        </datalist>
        <input type="submit" value="Search" />
      </form>
    
    </div>
  );
}
