import { useFormik } from 'formik'
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaUserPlus } from 'react-icons/fa'


toast.configure()

function VHelp({message}){
  return <div className="invalid-feedback">{message}</div>
}

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required()
})

export default function SignupForm() {
  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: ""
    }, 
    validationSchema,
    onSubmit(values){
        fetch('/api/users/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'same-origin',
            body: JSON.stringify(values)
        }).then((response) => {
            if(!response.ok) throw Error('Failed to sign up')
            return response.text()
        })
        .then(()=> {
            toast('Sucessfully signed up!', {
                onClose: () => {
                    document.location = "/"
                }
            })
        }).catch((error) => {
            toast('Failed to sign up!', {
                onClose: () => {
                    document.location = "/"
                }
            })
        })
    }
  })

  return (
    <>
    <hr></hr>
      <form className="needs-validation" onSubmit={handleSubmit}>
        {/* <h1>Sign Up</h1> */}
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
          <label htmlFor="username" className="form-label">Username</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.username ? 'is-invalid' : ''}`} type="text" id="username" name="username" value={values.username} onChange={handleChange}/>
            <VHelp message={errors.username}/>
          </div>
        </div>
        <div className="field mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="input-group has-validation">
            <input className={`form-control ${errors.password ? 'is-invalid' : ''}`} type="password" id="password" name="password" value={values.password} onChange={handleChange}/>
            <VHelp message={errors.password}/>
          </div>
        </div>
 
        <div className="mb-3">
          <button type="submit" className="btn btn-info text-light me-2">Sign Up <FaUserPlus className="text-light ml-2"></FaUserPlus></button>
          <button type="button" className="btn btn-secondary" onClick={()=> document.location = '/'}>Cancel</button>
        </div>
      </form >
    </>
  )
}