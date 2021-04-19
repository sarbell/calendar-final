// import React, { useState, createContext, useEffect } from 'react'
// import { Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom'
// import Calendar from './calendar'


// export const EventContext = createContext()

// export default function CalendarRouter() {
//   const [events, setEvents] = useState() 

//   useEffect(()=> {
//     if(!events){
//       fetch('/events.dat')
//       .then(response => response.text())
//       .then((data) => {
//         setEvents(JSON.parse(data, (key, value) => {
//           const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
//           if(typeof value === 'string' && dateFormat.test(value)){
//             return new Date(value)
//           }
//           return value
//         }))
//       })
//       .catch(console.error)
//     }

//   })
//   if(!events)
//     return <p>Loading...</p>

//   return (
//     <EventContext.Provider value={{events, setEvents}}>
//       <Switch>
//         <Route exact path="/home"><Calendar/></Route>
//         <Redirect from="" to="/home" />
//       </Switch>
//     </EventContext.Provider>
//   )
// }