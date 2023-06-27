import React from 'react'
import '../styles/module.signin.css'
import SideImage from '../images/side-picture.svg'

export default function SigninForm() {
  return (
      <div className='signup-container'>
          <h1 className='font-bold text-blue-700 text-4xl text-center pb-8'>Make every connection count</h1>
          <div className='signup-content'>
              <div className='form-cont'>
                  <div className='form-image'>
                      <img src={SideImage} alt='side' />
                  </div>
                  <div className='form-group'>
                      <h1>Log in</h1>
                      <form method='POST' action=''>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter Email</label>
                            <input placeholder='enter email' type='email' name='email'></input>   
                          </div>
                          <div className='d-from'>
                            <label htmlFor="input1">Enter password</label>
                            <input placeholder='Last name' type='password'  name='password'></input>  
                            <div className='d-from'><button>Log in</button></div> 
                          </div>
                      </form>
                      
                  </div>
                  
              </div>
          </div>
    </div>
  )
}
