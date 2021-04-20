import express from 'express'

import {contactPage, indexPage, aboutPage, loginPage, signupPage} from '../controllers/index'
import {allEventsAPI, oneEventAPI, createEventAPI, updateEventAPI, deleteEventAPI} from '../controllers/events'
import {contactAPI} from '../controllers/contacts'
import {signUpUserAPI, signUserInAPI } from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'


let router = express.Router()

function isLoggedIn(req){
    try{
      jwt.verify(req.cookies.token, APP_SECRET)
      return true
    }catch(err){
      return false
    }
  }

  function requireLogIn(req, res, next){
    if(isLoggedIn(req)){
      next()
    }else{
      res.status(401)
      res.end()
    }
  }
  
  export function getCurrentUser(req){
    if(req.cookies.token){
      return jwt.decode(req.cookies.token, APP_SECRET) 
    }else {
      return null
    }
  }

export function configureRoutes(app){
    app.all('*', (req, res, next)=>{
        app.locals.signedIn = isLoggedIn(req)
        app.locals.currentUser = getCurrentUser(req)
        next()
      })

    router.get('/', indexPage)
    router.get('/calendar*', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/login', loginPage)
    router.get('/signup', signupPage)

    router.get('/login', indexPage)
    router.get('/signup', indexPage)

    // Events API
    router.get('/api/events', allEventsAPI)
    router.get('/api/events', allEventsAPI )
    router.get('/api/events/:id', oneEventAPI )
    router.post('/api/events', requireLogIn, createEventAPI )
    router.put('/api/events/:id', requireLogIn, updateEventAPI )
    router.delete('/api/events/:id', requireLogIn, deleteEventAPI )

    // Users
    router.post('/api/users/signup', signUpUserAPI)
    router.post('/api/users/signin', signUserInAPI)

    router.post('/api/contact', contactAPI )

    app.use('/', router)
}