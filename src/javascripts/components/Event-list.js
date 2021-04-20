import React, { createContext, useEffect, useState } from 'react'
import Event from './Event'
import { Redirect, Link, Route, Switch, useHistory } from 'react-router-dom'
import { About, ErrorNotFound } from '../components/Pages'
import Calendar from '../components/Calendar'
import EventForm from './Event-form'
import CalendarEvent from '../components/Calendar-event'
import { useCookies } from 'react-cookie'
import WelcomeMessage from '../components/WelcomeMessage'



export const CalendarContext = createContext()

export default function EventList(){
    const [events, setEvents] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
    const history = useHistory()

    useEffect(() => {
        if(!events){
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
        }

    })
        if(!events){
            return<p>Loading...</p>
        }
        return (
            <CalendarContext.Provider value={{events, setEvents, authenticated, setAuthenticated}}>
            <main>
                {/* {if(!signedIn)} */}
                <div className="container">
                    <div className="row">
                        <div className="col text-center py-5">
                            <h2 className="display-3">Welcome to DailyCalendar!</h2>
                            <h2 className="pb-4"> Please log in or sign up to add, edit, or delete events.</h2>
                            <Link to={'/login'} type="button" className="btn btn-info btn-lg px-5">Login</Link>
                            <Link to={'/signup'} type="button" className="btn btn-outline-info btn-lg px-5">Sign Up</Link>

                        </div>
                    </div>
                </div>
                <button className="btn btn-info" onClick={()=> history.push('/calendar/new')}>Add New Event</button>
                <Calendar />
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
                    <Redirect from="" to="/calendar" />
                    <Route path="*"><ErrorNotFound/></Route>
                </Switch>
            </main>
     
            </CalendarContext.Provider>
        )
}