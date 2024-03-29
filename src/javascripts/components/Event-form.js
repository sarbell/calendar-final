import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router'
import { CalendarContext } from './Calendar-router'
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
    title: yup.string().required("Title is required!"),
    description: yup.string(),
    location: yup.string(),
    start_date: yup.date().required("Start date is required!"),
    end_date: yup.date().required("End date is required!"),
    link: yup.string().url(),
    notes: yup.string(),
})

export function EventForm(){
  let {events, setEvents, authenticated, setAuthenticated} = useContext(CalendarContext)
  const history = useHistory()
  let {eid} = useParams()

  if(!authenticated){
      document.location = '/login'
      return <></>
    } 

    let event = eid ? events.find(e => e.id == eid) : {}
    let is_new = eid === undefined

    const {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
      initialValues: is_new ? {
            title: "",
            description: "",
            location: "",
            begin_date: "",
            finish_date: "",
            link: "",
            notes: ""
        } : {...event},
        validationSchema,
        onSubmit(values){
            fetch(`/api/events${is_new ? '' : '/' + event.id}`, {
              method: is_new ? "POST" : "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              credentials: 'same-origin',
              body: JSON.stringify(values)
            }).then(()=> {
              toast('Sucessfully Submitted!', {
                  onClose: () => {
                      document.location = "/calendar"
                  }
              })
            }).catch((error) => {
              toast('Failed to submit!', {
                  onClose: () => {
                      document.location = "/calendar"
                  }
              })
            })
        }
    })
    return(
    <>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <h1 className="display-4">
          {is_new ? "Adding a new event" : "Editing an event"}
        </h1>
        <div className="field mb-3">
          <label htmlFor="title" className="form-label">Event Title</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} type="text" id="title" name="title" value={values.title} onChange={handleChange}/>
            <ValidationMessage message={errors.title}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <div className="input-group has-validation">
            <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} id="description" name="description" value={values.description} onChange={handleChange}></textarea>
            <ValidationMessage message={errors.description}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.location ? 'is-invalid' : ''}`} type="text" id="location" name="location" value={values.location} onChange={handleChange}/>
            <ValidationMessage message={errors.location}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="start_date" className="form-label">Start Date</label>
          <div className="input-group has-validation">
            <div className={errors.start_date ? 'is-invalid' : ''}>
              <DatePicker className={`form-control ${errors.start_date ? 'is-invalid' : ''}`} id="start_date" name="start_date" selected={values.start_date} onChange={date => setFieldValue('start_date', date)}/>
            </div>
            <ValidationMessage message={errors.start_date}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="end_date" className="form-label">End Date</label>
          <div className="input-group has-validation">
            <div className={errors.end_date ? 'is-invalid' : ''}>
              <DatePicker className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}  id="end_date" name="end_date" selected={values.end_date} onChange={date => setFieldValue('end_date', date)}/>
            </div>
            <ValidationMessage message={errors.end_date}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="link" className="form-label">Link</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.link ? 'is-invalid' : ''}`}  type="text" id="link" name="link" value={values.link} onChange={handleChange}/>
            <ValidationMessage message={errors.link}/>
          </div>
        </div>

        <div className="field mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <div className="input-group has-validation">
            <textarea className={`form-control ${errors.notes ? 'is-invalid' : ''}`}  id="notes" name="notes" value={values.notes} onChange={handleChange}></textarea>
            <ValidationMessage message={errors.notes}/>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-info me-2">Submit</button>
          <button onClick={()=> is_new ? history.push('/calendar/') : history.push(`/calendar/${values.id}`)} className="btn btn-secondary me-2">Cancel</button>
        </div>
      </form >
    </>

    )
}