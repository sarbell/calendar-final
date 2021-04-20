import React from 'react'
import EventList from './Event-list'
import { FaCalendar, FaCalendarAlt } from 'react-icons/fa'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Main(){
    return (
        <Router>
            <EventList/>
        </Router>
    )
}