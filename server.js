let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

// Connect to the database
import {connect} from './src/javascripts/config/db/connect'
connect("mongodb://localhost:27017/calendar")

// Create express webserver
export let app = express()

app.set('views', path.join(__dirname, 'src', 'javascripts', 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Routing
import {configureRoutes} from './src/javascripts/config/routes'
configureRoutes(app)

// Error Handling
app.use(function(req, res, next){
    next(createError(404))
})

app.use(function(err, req, res, next){
    res.status(err.status || 500)
    res.render(err)
})


// Create the web server
let http = require('http')
let server = http.createServer(app)
server.listen(process.env.PORT || '8080')
server.on('error', err => {
    throw err
})

server.on('listening', () => {
    let address = server.address()
    let bind = typeof address === 'string' ? address: address.port
    console.log("Listening on " + bind)
})


