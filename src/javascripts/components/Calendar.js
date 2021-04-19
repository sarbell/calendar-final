import React from 'react'
import { format, getDate, getMonth, endOfMonth, lastDayOfMonth, startOfMonth } from 'date-fns'

export default function Calendar(){
     let todaysDate = format(new Date(), 'MM/dd/yyyy')

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
                <div className="col border dayBox">
                    <p>{""}</p>
                </div>
            )
        }
        else if(weekdayNames[i] == firstDayOfMonth()){
            break
        }
    }

    // fill in how many days
    let numericDays = []
    for(let i = 1; i <= Number(endDayOfMonth); i++){
        numericDays.push(
        <div  className="col border dayBox">
                <p key={i}>{i}</p>
            </div>
       )
    }
    // console.log(numericDays)

    // Need to combine so the blanks will be at the top
    let allCalendarSpaces = [...empty, ...numericDays]
    
    // add blank spots at the end of the calendar
    // let emptyEnd = []
    console.log(allCalendarSpaces.length)
    for(let i = 0; i <allCalendarSpaces.length; i++){
        if(allCalendarSpaces.length % 7 != 0){
            allCalendarSpaces.push(
                <div className="col border dayBox">
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
    console.log(allCalendarSpaces)

    let calendarDays = weeks.map((d, i) => {
        return (
            <div className="row hello">
                {d}
            </div>
        )
    })
     

    return (
        <div className="container">
            <div className="row py-5">
                <div className="col">
                    <h2>{month} {year}</h2>                     
                </div>
            </div>
            <div className="row">
                {weekdays}
            </div>
            <div className="row">
                {calendarDays}
            </div>
            
        </div>
    )
}