import mongoose from 'mongoose'

const Schema = mongoose.Schema

let eventSchema = new Schema({
    id: Number,
    title: String,
    description: String,
    location: String,
    start_date: Date,
    end_date: Date,
    full_day: String,
    full_day_date: Date,
    link: String,
    Notes: String,
    added_at: Date,
    updated_at: Date,
    added_at: Date,
    created_by: String
})

export let Event = mongoose.model("Event", eventSchema)