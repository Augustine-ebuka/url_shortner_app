import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/module.navbar.css'
import {Link} from 'react-router-dom'

export default function Navbar() {
    const [email, setEmail] = useState()
    const [login, setLogin] = useState(false)
  return (
      <div className='navbarContainer'>
          <div className='logo'>
              <Link to='/'><h1>Ushort</h1></Link>
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
