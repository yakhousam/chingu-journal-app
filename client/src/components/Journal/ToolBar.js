
import  React from 'react'
export default function ToolBar(props){
    return(
        <div className='tool-bar'>
            <button onClick={()=>props.newNote()}></button>
           
        </div>
    )
}