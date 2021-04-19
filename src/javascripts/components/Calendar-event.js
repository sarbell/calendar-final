import React from 'react'
import { useHistory } from 'react-router'



export default function CalendarEvent(props){
    const history = useHistory()
    const e = props.event
        return(
            <button className="btn btn-outline-info" onClick={() => history.push(`/calendar/${e.id}/event`)}>
                {e.title}
            </button>
        )
}