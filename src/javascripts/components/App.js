import React from 'react'
import EventList from './Event-list'
import CalendarRouter from './Calendar-router'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Main(){
    return (
        <Router>
            {/* <EventList/> */}
            <CalendarRouter/>
        </Router>
    )
}