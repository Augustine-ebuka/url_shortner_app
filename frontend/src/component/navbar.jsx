import React from 'react'
import '../styles/module.navbar.css'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
      <div className='navbarContainer'>
          <div className='logo'>
              <h1>Ushort</h1>
          </div>
          <div className='menu-list'>
              <ul>
                  <li><Link to='/signup'>Sign up</Link></li>
                  <li><Link to='/signin'>Sign in</Link></li>
              </ul>
          </div>
    </div>
  )
}
