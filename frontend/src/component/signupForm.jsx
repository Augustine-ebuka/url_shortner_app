import React from 'react'
import { useState } from 'react'
import '../styles/module.signup.css'
import SideImage from '../images/side-picture.svg'
import { useFormik } from 'formik'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';


export default function SignupForm() {
 const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name:'',
      email: '',
      password: '',
    },
    validateOnBlur: false, 
    validateOnChange: false,
    onSubmit: async values => {
      try {
        fetch('http://localhost:5000/users/signup', {
          method: 'POST',
          headers:{"content-type": "application/json"},
          body: JSON.stringify(values)
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
          .then((data) => {
            console.log(data);
            toast.success(data.message)
            navigate('/')
          })
          .catch((error) => {
          toast.error("not registered")
          console.log(error)
        })
      } catch (error) {
        console.log(error);
      }
    }
  })
  
  return (
    <div className='signup-container'>
    <Toaster position='top-center' reverseOrder=''></Toaster>
          <h1 className='font-bold text-blue-700 text-4xl text-center pb-8'>Make every connection count</h1>
          <div className='signup-content'>
              <div className='form-cont'>
                  <div className='form-image'>
                      <img src={SideImage} alt='side' />
                  </div>
                  <div className='form-group'>
                      <h1>Create New Account</h1>
                      <form method='POST' onSubmit={formik.handleSubmit}>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter First Name</label>
                            <input {...formik.getFieldProps('first_name')} placeholder='First name' name='first_name'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter Last Name</label>
                            <input {...formik.getFieldProps('last_name')} placeholder='Last name'  name='last_name'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter Email</label>
                            <input type='email' {...formik.getFieldProps('email')} placeholder='Email'  name='email'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter Password</label>
                            <input type='password' {...formik.getFieldProps('password')} placeholder='Password'  name='password'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Confirm Password</label>
                            <input type='password' placeholder='confirm-Password'  name='confirm-password'></input>   
                          </div>
                          <div className='d-from'>
                            
                              <input type="checkbox" style={{ height: "10px" }} />
                              I agree with the Terms of services and Privacy Policy
                          </div>
                          <div className='d-from'><button type='submit'>Sign up</button></div>
                      </form>
                      
                  </div>
                  
              </div>
          </div>
    </div>
  )
}
