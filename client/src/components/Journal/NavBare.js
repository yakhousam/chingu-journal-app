import Select from './Select'
import  React from 'react'
export default function NavBare(props){
    return(
        <div className="nav">
            <Select setNoteListQuery={props.setNoteListQuery}/>
            <h1>Journey</h1>
            <h2>{props.username}</h2>
            <a href='/logout'>Logout</a>
           
        </div>
    )
}