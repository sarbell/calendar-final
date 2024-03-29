import React, {useContext, useState} from 'react'
import { useHistory, useParams } from 'react-router'
import { CalendarContext } from './Calendar-router'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPencilAlt, FaTrashAlt} from 'react-icons/fa'
import { format, getDate, getMonth, endOfMonth, lastDayOfMonth, startOfMonth } from 'date-fns'



export default function Event(){
    let {events, setEvents, authenticated, setAuthenticated} = useContext(CalendarContext)
    let{eid} = useParams()
    let e = eid ? events.find(e => e.id == eid ) : {}
    const history = useHistory()

    let deleteEvent = () => {
        fetch(`/api/events/${e.id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          }, 
          credentials: 'same-origin',
        }).then(()=> {
          toast('Sucessfully Submitted!', {
              onClose: () => {
                  document.location = "/"
              }
          })
        }).catch((error) => {
          toast('Failed to submit!', {
              onClose: () => {
                  document.location = "/"
              }
          })
        })
      }

        return(
            <>
                <div className="container">
                    {!authenticated ?
                        <div className="alert-info text-center">
                            <p>
                                <a className="text-primary loginLink" onClick={() => document.location = '/login'}>Login </a>
                                to edit or delete.
                            </p>
                        </div>
                     : <></>
                    }
                    <div className="row">
                        <div className="col-6">
                            <h2>{e.title}</h2>
                        </div>
                        <div className="col-6 text-end">
                        {authenticated ?
                                <>
                                    <button className="btn btn-warning" onClick={() => history.push(`/calendar/${e.id}/edit`)}>
                                        Edit <FaPencilAlt />
                                    </button>
                                    &nbsp; 
                                    <button className="btn btn-danger text-right" data-bs-toggle="modal" data-bs-target="#deleteEvent" >
                                        Delete <FaTrashAlt />
                                    </button>
                                    &nbsp;
                                </>
                            : <></>
                        }
                            <button type="button" className="btn btn-secondary me-2 text-right" onClick={()=> history.push(`/calendar/`) }>Back to Calendar</button>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col">
                            {format(e.start_date, 'MMMM dd, yyyy') == format(e.end_date, 'MMMM dd, yyyy') 
                                ?
                                <h3>{format(e.end_date, 'MMMM dd, yyyy')}</h3>
                                :
                                <h3>{format(e.start_date, 'MMMM dd')} - {format(e.end_date, 'MMMM dd, yyyy')} </h3>

                            }
                                
                            {e.description ?
                            <p><strong>Description: </strong>{e.description}</p>
                            :
                            <></>
                            }
                            {e.location ?
                            <p><strong>Location: </strong>{e.location}</p>
                            :
                            <></>
                            }
                            {e.link ?
                            <p><strong>Link: </strong> <a href={e.link}>{e.link}</a></p>
                            :
                            <></>
                            }
                            {e.link ?
                            <p><strong>Notes: </strong>{e.notes}</p>
                            :
                            <></>
                            }
                        </div>
                    </div>
                </div>
                <div className="modal fade" tabIndex="-1" role="dialog" id="deleteEvent">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure you want to delete?</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <p>Hitting the delete button will delete "{e.title}" from your calendar.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" 
                                onClick={deleteEvent}
                                >Yes, Delete!</button>
                                <button type="button" className="btn btn-info" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
          </>
        )
}