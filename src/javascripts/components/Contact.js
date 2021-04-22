import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaPaperPlane } from 'react-icons/fa'

toast.configure()

function VHelp({message}){
  return <div className="invalid-feedback">{message}</div>
}

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required()
})

export function ContactForm() {  
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: ""
    }, 
    validationSchema,
    onSubmit(values){
        fetch('/api/contact', {
            method: "POST",
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
  


  return (
    <>
    <hr></hr>
      <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="field mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.name ? 'is-invalid' : ''}`} type="text" id="name" name="name" value={values.name} onChange={handleChange}/>
            <VHelp message={errors.name}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.email ? 'is-invalid' : ''}`} type="text" id="email" name="email" value={values.email} onChange={handleChange}/>
            <VHelp message={errors.email}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <div className="input-group has-validation">
            <textarea className={`form-control ${errors.message ? 'is-invalid' : ''}`} id="message" name="message" value={values.message} onChange={handleChange}></textarea>
            <VHelp message={errors.message}/>
          </div>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-info text-light me-2">Submit <FaPaperPlane className="text-light ml-2"></FaPaperPlane></button>
          <button type="button" className="btn btn-secondary" onClick={()=> document.location = "/calendar"} >Cancel</button>
        </div>
      </form >
    </>
  )
}