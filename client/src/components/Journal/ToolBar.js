
import React, { useState } from 'react'
export default function ToolBar(props) {
    const [isCalendar, setCalendar] = useState(false)
    const handleChange = (e) => {
        setCalendar(false);
        console.log(e.target.value)
        const query = e.target.value ? `?dateCalendar=${e.target.value}` : '';
        props.setNoteListQuery(query)
    }
    return (
        <div className='tool-bar' title='add note'>
            <button className="btn-tool-add" onClick={() => props.newNote()}></button>
            <div className="calendar-wraper">
                <button className="btn-tool-calendar" onClick={() => { setCalendar(!isCalendar) }}></button>
                {isCalendar && <input className='calendar' type='date' onChange={handleChange} />}
            </div>
        </div>
    )
}