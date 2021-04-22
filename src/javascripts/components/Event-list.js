import React, { createContext, useEffect, useState, useContext } from 'react'
import Event from './Event'
import { Redirect, Link, Route, Switch, useHistory } from 'react-router-dom'
import { About, ErrorNotFound } from '../components/Pages'
import Calendar from '../components/Calendar'
import {EventForm} from './Event-form'
import { CalendarContext } from './Calendar-router'
import CalendarEvent from '../components/Calendar-event'
import { useCookies } from 'react-cookie'
import {WelcomeMessage} from '../components/Pages'




export default function EventList(){
    let {events, setEvents, authenticated, setAuthenticated} = useContext(CalendarContext)
    const history = useHistory()

        return (
            <>
                {!authenticated
                    ? <WelcomeMessage />
                    : <div>
                    </div>
                }
                <Calendar />
                <div className="container pt-5">
                    <div className="row">
                        <div className="col">
                            <h2>Upcoming Events</h2>
                            <hr className="mb-3"></hr>
                                {
                                events.map(e => {
                                    return <CalendarEvent key={e.id} event={e}/>
                                })
                                }
                        </div>
                    </div>
            
                </div>
            </>
        )
}