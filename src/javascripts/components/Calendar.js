import React, { useState, useContext } from 'react'
import { format, getDate, getMonth, endOfMonth, lastDayOfMonth, startOfMonth } from 'date-fns'
import { Redirect, Link, Route, Switch, useHistory } from 'react-router-dom'
import { CalendarContext } from './Calendar-router'
import { useCookies } from 'react-cookie'
import { FaPlus } from "react-icons/fa";
import CalendarEvent from "./Calendar-event"
import { setDayWithOptions } from 'date-fns/fp'



export default function Calendar(){
    let {events, setEvents, authenticated, setAuthenticated} = useContext(CalendarContext)
    const history = useHistory()

    let todaysDate = () => {
        let today = new Date()
        today = format(today, 'd')
         return today
     }

     let eventsInMonth = []
    let getEventsInMonth = () => {
        events.map(e => {
            if(format(e.start_date, 'MMMM') == month) {
                eventsInMonth.push(e)
            }
        })
        return eventsInMonth
    }
    // console.log(eventsInMonth)
 
     const month = format( new Date(), 'MMMM')
     const year = format( new Date(), 'yyyy')
    //  let firstDayOfMonth = startOfMonth(new Date())
    //  firstDayOfMonth = format(firstDayOfMonth, 'EEE')
    let firstDayOfMonth = () => {
        let firstDay = startOfMonth(new Date())
        firstDay = format(firstDay, 'EEE')
        return firstDay
     };

     let endDayOfMonth = lastDayOfMonth(new Date())
     endDayOfMonth = format(endDayOfMonth, 'd')

     // Get the weekday headers to display
    let weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let weekdays = weekdayNames.map(day => {
        return (
            <div key={day} className="col weekDayHeaders">
                <h3>{day}</h3>
            </div>
        )
    })

    // make it start on the right week day
    let empty = []
    for(let i = 0; i < weekdayNames.length; i ++){
        if(weekdayNames[i] !== firstDayOfMonth()){
            empty.push(
                <div key={i.toExponential(8)} className="col border dayBox">
                    <p>{""}</p>
                </div>
            )
        }
        else if(weekdayNames[i] == firstDayOfMonth()){
            break
        }
    }


  
    events.map(e => {
        if(format(e.start_date, 'MMMM') == month) {
            eventsInMonth.push(e)
        }
    })
   eventsInMonth = getEventsInMonth()
    // console.log(eventsInMonth)

    //fill in how many days
    let numericDays = []
    let calendarEvent = ''
    for(let i = 1; i <= Number(endDayOfMonth); i++){
        let today = i == todaysDate() ? 'today' : ""

        let eve = eventsInMonth.find(e => format(e.start_date, 'd') == i)
        // console.log(eve)
        if(eve == undefined){
            calendarEvent = ""
        }else{
            calendarEvent = "calendarEvent"
        }

        numericDays.push(
            <div  key={i} className={`col border dayBox ${today}`}>
                    <p>{i}</p>
                    {eve &&
                        <div key={eve.id} className={`btn alert-success ${calendarEvent}`} onClick={() => history.push(`/calendar/${eve.id}/event`)}>
                            {eve.title}
                        </div>
                    }
            </div>
        )
    }

    // Need to combine so the blanks will be at the top
   let allCalendarSpaces = [...empty, ...numericDays]
    
   // add blank spots at the end of the calendar
    //let emptyEnd = []
    //console.log(allCalendarSpaces.length)
    for(let i = 0; i <allCalendarSpaces.length; i++){
        if(allCalendarSpaces.length % 7 != 0){
            allCalendarSpaces.push(
                <div key={i} className="col border dayBox">
                    <p>{""}</p>
                </div>
            )
        }else{
            break
        }
    }


    let weeks = []
    let days = []
    allCalendarSpaces.forEach((week, i) => {
        // console.log(i)
        if(i % 7 !== 0){
            days.push(week)
        }else{
            weeks.push(days)
            days = [];
            days.push(week)
        }
        if(i === allCalendarSpaces.length - 1){
            weeks.push(days)
        }
    })
    // console.log(allCalendarSpaces)

    let calendarDays = weeks.map((d, i) => {
        // console.log(d)
        // console.log(i)
        return (
            <div key={i} className="row">
                {d}
            </div>
        )
    })

     

    return (
        <div className="container">
            <div className="row py-5">
                <div className="col-8">
                    <h2>{month} {year}</h2>                     
                </div>
                <div className="col-4 text-end">
                    <Link className="btn btn-info" to='/calendar/new'><FaPlus />Add New Event</Link>                      
                </div>
            </div>
            <div className="row">
                {weekdays}
            </div>
            <div className="container">
                {calendarDays}
            </div>
            
        </div>
    )
}