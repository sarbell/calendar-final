import React, { createContext, useEffect, useState } from 'react'
import Event from './Event'
import { Redirect, Link, Route, Switch, useHistory } from 'react-router-dom'
import { About, ErrorNotFound } from '../components/Pages'
import Calendar from '../components/Calendar'
import {EventForm} from './Event-form'
import { useCookies } from 'react-cookie'
import EventList from '../components/Event-list'



export const CalendarContext = createContext()

export default function CalendarRouter(){
    const [events, setEvents] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
    const history = useHistory()

    useEffect(() => {
        if(!events){
            fetch('/api/events', {
                credentials: 'same-origin',
            })
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
            return(
                <div className="container text-center">
                    <div className="spinner-border" role="status"></div>
                    <br></br>
                    <h3 className="">Loading...</h3>
                </div>
            )
        }

        return (
            <CalendarContext.Provider value={{events, setEvents, authenticated, setAuthenticated}}>
                <Switch>
                    <Route exact path="/calendar"><EventList /></Route>
                    <Route path="/calendar/:eid/event"><Event></Event></Route>
                    <Route path="/calendar/:eid/delete"><Event></Event></Route>
                    <Route path="/calendar/new"><EventForm></EventForm></Route>
                    <Route path="/calendar/:eid/edit"><EventForm></EventForm></Route>
                    <Redirect from="" to="/calendar" />
                    <Route path="*"><ErrorNotFound/></Route>
                </Switch>
     
            </CalendarContext.Provider>
        )
}