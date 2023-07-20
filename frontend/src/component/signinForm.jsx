import React from 'react'
import '../styles/module.signin.css'
import SideImage from '../images/side-picture.svg'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from './httpClient'

export default function SigninForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password:'',
    },
    validateOnBlur: false, 
    validateOnChange: false,
    onSubmit: async values => {
    try {
      const { email, password } = values
      const res = await axios.post('http://localhost:5000/users/signin', {
        email,
        password
      })
      if (res.status === 200) { 
        toast.success(res.data.message)
        setTimeout(() => {
          navigate('/dashboard') 
        }, 3000)
        console.log("login successful")
      } else {
        toast.error(res.data.error)
        console.log("password or username not correct");
      }
    } catch (error) {
     console.log("error eventually occure"); 
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
                      <h1>Log in</h1>
                      <form method='POST' action='' onSubmit={formik.handleSubmit}>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter Email</label>
                            <input placeholder='enter email' {...formik.getFieldProps('email')} type='email' name='email'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter password</label>
                            <input placeholder='Last name' {...formik.getFieldProps('password')} type='password'  name='password'></input>  
                            <div className='d-from'><button type='submit'>Log in</button></div> 
                          </div>
                      </form>
                      
                  </div>
                  
              </div>
          </div>
    </div>
  )
}
