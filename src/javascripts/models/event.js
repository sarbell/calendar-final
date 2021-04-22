import mongoose from 'mongoose'

const Schema = mongoose.Schema

let eventSchema = new Schema({
    title: String,
    description: String,
    location: String,
    start_date: Date,
    end_date: Date,
    link: String,
    notes: String,
    updated_at: Date,
    added_at: Date,
    created_by: { type: Schema.Types.ObjectId, ref: 'User' }
})

eventSchema.virtual('id').get(function(){
    return this._id.toHexString()
}) 

eventSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret._id
    }
})

export let Event = mongoose.model("Event", eventSchema)