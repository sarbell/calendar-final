import { Event } from '../models/event'

// /api/events
export const allEventsAPI = (req, res, next) => {
    Event.find().select().exec((err, events) => {
        if(err){
            res.json({sucess: false, message: "Query Failed"})
            res.end()
        }else{
            res.write(JSON.stringify(events))
            res.end()
        }
    })
}

// GET api/events/:id
export const oneEventAPI = (req, res, next) => {
    Event.find({_id: req.params.id}).select().exec((err, event) => {
        if(err){
            res.json({success: false, message: "Query failed."})
            res.end()
        }else{
            res.write(JSON.stringify(event))
            res.end()
        }
    })
}

// POST  /api/events/
export const createEventAPI = (req, res, next) => {
    let event = new Event(req.body)
    event.added_at = new Date()
    event.updated_at = new Date()
    event.save(err => {
        if(err){
            res.json({success: false, message: "Event creation failed"})
            res.end()
        }else{
            res.end()
        }
    })
}

// PUT  /api/events/:id
export const updateEventAPI = (req, res, next) => {
    Event.findOne({_id: req.params.id}).select().exec((err, event) => {
        if(err){
            res.json({success: false, message: "Undable to update."})
            res.end()
        }else{
            Object.assign(event, req.body)
            event.updated_at = new Date()
            event.save(err => {
                if(err){
                    res.json({success: false, message: "Unable to update event"})
                    res.end()
                }else{
                    res.end()
                }
            })
        }
    })
}

// DELETE  /api/events/:id
export const deleteEventAPI = (req, res, next) => {
    Event.findOne({_id: req.params.id}).select().exec((err, event) => {
        if(err){
            res.json({success: false, message: "Undable to delete."})
            res.end()
        }else{
            Event.findByIdAndDelete(req.params.id, err => {
                if(err){
                    res.json({success: false, message: "Unable to delete event"})
                    res.end()
                }else{
                    res.end()
                }
            })
        }
    })
}