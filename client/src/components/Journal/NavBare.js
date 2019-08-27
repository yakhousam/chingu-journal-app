
import  React from 'react'
export default function NavBare(props){
    return(
        <div className="nav">            
            <h1>Journey</h1>
            <h2>{props.username}</h2>
            <a className='btn' href='/logout'>Logout</a>
           
        </div>
    )
}