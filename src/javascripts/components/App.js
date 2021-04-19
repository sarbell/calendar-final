import React from 'react'
import EventList from './Event-list'
import { FaCalendar, FaCalendarAlt } from 'react-icons/fa'
import { BrowserRouter as Router } from 'react-router-dom'

export default function Main(){
    return (
        <Router>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg py-3">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-info">
                        <span className="daily">Daily <FaCalendarAlt className="text-info" /></span>
                            <br></br>
                        <span className="calendarLogo">Calendar</span>
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a href="/" className="nav-link active">Home</a>
                        </li>
                        <li className="nav-item">
                        <a href="/about" className="nav-link active">About</a>
                        </li>
                    </ul>
                    </div>

                    {/* <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li><a className="btn btn-outline-light" id="_sign_user_out">Sign Out</a> </li>
                        <li><a className="nav-link" href="/signin">Sign In</a></li>
                        <li><a className="nav-link" href="/signup">Sign Up</a></li>
                    </ul>
                    </div> */}
                </div>
            </nav>
            <div className="container">
                <header>
                    <h1>Daily Calendar</h1>
                </header>
                <EventList/>
            </div>
            <hr/><footer>&copy; All rights reserved</footer>   
        </Router>
    )
}