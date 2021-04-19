import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { CalendarContext } from './Event-list'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

toast.configure()

function ValidationMessage({message}){
  return <div className="invalid-feedback">{message}</div>
}

const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string(),
    location: yup.string(),
    full_day: yup.string().required(),
    full_day_date: yup.date(),
    begin_date: yup.date().required(),
    finish_date: yup.date().required(),
    link: yup.string().url(),
    notes: yup.string(),
  })

export default function EventForm(){
    let {events, setEvents} = useContext(CalendarContext)

    let {eid} = useParams()

    let event = eid ? events.find(e => e.id == e.id) : {}
    let is_new = eid === undefined
    let {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: is_new ? {
            title: "",
            description: "",
            location: "",
            full_day: "",
            full_day_date: "",
            begin_date: "",
            finish_date: "",
            link: "",
            notes: ""
        } : {...event},
        validate(values){
            let errors = {}
            if(!values.title) errors.title = "Title is required."
            if(!values.full_day) errors.full_day = "Please mark if it is a full day event or not."
            if(!values.begin_date) errors.begin_date = "Start date is required."
            if(!values.end_date) errors.end_date = "End date is required."

            return errors
        },
        onSubmit(values){
            if(is_new){
                let id = events.length
                while(true){
                    let ev = events.find(e => e.id == id++)
                    if(ev === undefined) break
                }
                values.id = id
                events.push(values)
            }else{
                let ev = events.find(e => e.id == event.id)
                Object.assign(ev, values)
            }

            setEvents([...events])
            history.push('/calendar')
            toast(is_new ? "Successfully added event!" : "Successfylly Updated!")
        }
    })

    const history = useHistory()

    return(
    <>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <h1>
          {is_new ? "Adding a new event" : "Editing an event"}
        </h1>
        <div className="field mb-3">
          <label htmlFor="title" className="form-label">Event Title</label>
          <div className="input-group has-validation">
            <input className=""type="text" id="title" name="title" value={values.title} onChange={handleChange}/>
            <ValidationMessage message={errors.title}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <div className="input-group has-validation">
            <textarea className="" id="description" name="description" value={values.description} onChange={handleChange}></textarea>
            <ValidationMessage message={errors.description}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <div className="input-group has-validation">
            <input className="" type="text" id="location" name="location" value={values.location} onChange={handleChange}/>
            <ValidationMessage message={errors.location}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="type" className="form-label">Is this a full day event?</label>
          <div className="input-group has-validation is-invalid">
            <select className="" id="full_day" name="full_day" value={values.full_day} onChange={handleChange}>
              <option value="">not selected</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            <ValidationMessage message={errors.full_day}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="start_date" className="form-label">Start Date</label>
          <div className="input-group has-validation">
            <div className={errors.start_date ? 'is-invalid' : ''}>
              <DatePicker className="" id="start_date" name="start_date" selected={values.start_date} onChange={date => setFieldValue('start_date', date)}/>
            </div>
            <ValidationMessage message={errors.start_date}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="end_date" className="form-label">End Date</label>
          <div className="input-group has-validation">
            <div className={errors.end_date ? 'is-invalid' : ''}>
              <DatePicker className="" id="end_date" name="end_date" selected={values.end_date} onChange={date => setFieldValue('end_date', date)}/>
            </div>
            <ValidationMessage message={errors.end_date}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="link" className="form-label">Link</label>
          <div className="input-group has-validation">
            <input className="" type="text" id="link" name="link" value={values.link} onChange={handleChange}/>
            <ValidationMessage message={errors.link}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <div className="input-group has-validation">
            <textarea className="" id="notes" name="notes" value={values.notes} onChange={handleChange}></textarea>
            <ValidationMessage message={errors.notes}/>
          </div>
        </div>

        <div className="mb-3">
          <button type="button" className="btn btn-info me-2">Submit</button>
          <button onClick={()=> history.push('/calendar')} className="btn btn-secondary me-2">Cancel</button>
        </div>
      </form >
    </>

    )
}