import React from 'react'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'




export default function CalendarEvent(props){
    const history = useHistory()
    const e = props.event


        return(
            <div className="row my-2" >
                <div className="col alert-secondary">
                    <a onClick={() => history.push(`/calendar/${e.id}/event`)}>
                        <p><strong>{e.title}</strong> : <span className="text-right">{format(e.start_date, 'MMMM dd')} - {format(e.end_date, 'MMMM dd, yyyy')} </span></p>
                    </a>
                </div>
            </div>
        )
}
