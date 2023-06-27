import React from 'react'
import '../styles/module.signup.css'
import SideImage from '../images/side-picture.svg'

export default function SignupForm() {
  return (
      <div className='signup-container'>
          <h1 className='font-bold text-blue-700 text-4xl text-center pb-8'>Make every connection count</h1>
          <div className='signup-content'>
              <div className='form-cont'>
                  <div className='form-image'>
                      <img src={SideImage} alt='side' />
                  </div>
                  <div className='form-group'>
                      <h1>Create New Account</h1>
                      <form method='POST' action=''>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter First Name</label>
                            <input placeholder='First name' name='first_name'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter Last Name</label>
                            <input placeholder='Last name'  name='last_name'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter Email</label>
                            <input type='email' placeholder='Email'  name='email'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter Password</label>
                            <input type='password' placeholder='Password'  name='password'></input>   
                          </div>
                          <div className='d-from'>
                            
                              <input type="checkbox" style={{ height: "10px" }} />
                              I agree with the Terms of services and Privacy Policy
                          </div>
                          <div className='d-from'><button>Sign up</button></div>
                      </form>
                      
                  </div>
                  
              </div>
          </div>
    </div>
  )
}
