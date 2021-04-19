import { Event } from '../models/event'

export const allEventsAPI = (req, res, next) => {
    Events.find().select().exec((err, events) => {
        if(err){
            res.json({sucess: false, message: "Query Failed"})
            res.end()
        }else{
            res.write(JSON.stringify(events))
            res.end()
        }
    })
}