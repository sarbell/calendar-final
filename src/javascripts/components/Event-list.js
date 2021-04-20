import React, { createContext, useEffect, useState, useContext } from 'react'
import Event from './Event'
import { Redirect, Link, Route, Switch, useHistory } from 'react-router-dom'
import { About, ErrorNotFound } from '../components/Pages'
import Calendar from '../components/Calendar'
import EventForm from './Event-form'
import { CalendarContext } from './Calendar-router'
import CalendarEvent from '../components/Calendar-event'
import { useCookies } from 'react-cookie'
import WelcomeMessage from '../components/Pages'



export default function EventList(){
    let {events, setEvents, authenticated, setAuthenticated} = useContext(CalendarContext)
    const history = useHistory()

        return (
            <>
                {!authenticated
                    ? <WelcomeMessage />
                    : <div></div>
                }
                <div className="container">
                    <div className="row  mt-3">
                        <div className="col-2">
                            <Link className="btn btn-info" to={'/events/new'}>Add New Event</Link>                    
                        </div>
                    </div>
                </div>
                <div className="container project-list">
                    {
                    events.map(e => {
                        return <CalendarEvent key={e.id} event={e}/>
                    })
                    }
                </div>
            </>
        )
}