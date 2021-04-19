import express from 'express'

import {indexPage} from '../controllers/index'
import {allEventsAPI} from '../controllers/events'

let router = express.Router()

export function configureRoutes(app){
    router.get('/', indexPage)
    router.get('/calendar*', indexPage)
    router.get('/about', indexPage)
    router.get('/api/events', allEventsAPI)

    app.use('/', router)
}