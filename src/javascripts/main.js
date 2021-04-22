// Required by Webpack - do not touch
// require.context('../', true, /\.(html|json|txt|dat)$/i)
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

import 'bootstrap'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
// import {EventList} from './components/Event-list'
import {CalendarRouter} from './components/Calendar-router'

import {BrowserRouter as Router } from 'react-router-dom'
import {ContactForm} from '../javascripts/components/Contact'
import LoginForm from '../javascripts/components/Login'
import SignupForm from '../javascripts/components/Signup'
import Logout from '../javascripts/components/Logout'





if(document.getElementById('main')){
    ReactDOM.render(<Router><App/></Router>, document.getElementById('main'))
}else if(document.getElementById('contact')){
    ReactDOM.render(<ContactForm/>, document.getElementById('contact'))
}else if(document.getElementById('signup')){
    ReactDOM.render(<SignupForm/>, document.getElementById('signup'))
}
else if(document.getElementById('login')){
    ReactDOM.render(<LoginForm/>, document.getElementById('login'))
}
else if(document.getElementById('logout')){
    ReactDOM.render(<Logout/>, document.getElementById('logout'))
}
