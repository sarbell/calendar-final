import React, {useContext, useState} from 'react'
import { useHistory, useParams } from 'react-router'
import { CalendarContext } from './Event-list'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export default function Event(){
    let {events, setEvents} = useContext(CalendarContext)
    let{eid} = useParams()
    let e = eid ? events.find(e => e.id == eid ) : {}
    const history = useHistory()

    const deleteEvent = () => {
        for(let i in events){
            if(events[i].id === e.id){
                e.splice(+i, 1)
            }
        }
        setEvents([...events])
        history.push('/calendar')
        toast('Event successfully deleted!')

    }

        return(
            <>
            <div className="container">
                <div className="row">
                    <div className="column">
                        <h2>{e.title}</h2>
                        <p>{e.description}</p>
                        <button className="btn btn-outline-info" onClick={() => history.push(`/calendar/${e.id}/edit`)}>
                            Edit
                        </button>
                        <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#deleteEvent">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal fade" tabIndex="-1" role="dialog" id="deleteEvent">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Are you sure you want to delete?</h5>
                            <button type="button" className="btn-close" data-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                         <p>Hitting the delete button will delete "{e.title}" from your calendar.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={deleteEvent}>Yes, Delete!</button>
                            <button type="button" className="btn btn-info" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
          </>
        )
}