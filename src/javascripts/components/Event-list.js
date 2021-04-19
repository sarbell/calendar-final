import React, { createContext, useEffect, useState } from 'react'
import Event from './Event'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import { About, ErrorNotFound } from '../components/Pages'
import Calendar from '../components/Calendar'
import EventForm from './Event-form'
import CalendarEvent from '../components/Calendar-event'

export const CalendarContext = createContext()

export default function EventList(){
    const [events, setEvents] = useState()
    const history = useHistory()

    useEffect(() => {
        fetch('/api/events')
            .then(response => response.text())
            .then((data) => {
                setEvents(JSON.parse(data, (key, value) => {
                const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
                if(typeof value === 'string' && dateFormat.test(value)){
                    return new Date(value)
                }
                return value
                }))
            })
            .catch(console.error)
    })
        if(!events){
            return<p>Loading...</p>
        }
        return (
            <CalendarContext.Provider value={{events, setEvents}}>
            <button className="btn btn-info" onClick={()=> history.push('/calendar/new')}>Add New Event</button>
            {/* <Calendar /> */}
            <main>
                <Switch>
                    <Route exact path="/calendar">
                        {events.map(e => {
                            return <CalendarEvent key={e.id} event={e}/>
                        })}
                    </Route>
                    <Route path="/calendar/:eid/event"><Event></Event></Route>
                    <Route path="/calendar/:eid/delete"><Event></Event></Route>
                    <Route path="/calendar/new"><EventForm></EventForm></Route>
                    <Route path="/calendar/:eid/edit"><EventForm></EventForm></Route>
                    <Route path="/about"><About></About></Route>
                    <Redirect from="" to="/calendar" />
                    <Route path="*"><ErrorNotFound/></Route>
                </Switch>
      
            </main>
     
            </CalendarContext.Provider>
        )
}