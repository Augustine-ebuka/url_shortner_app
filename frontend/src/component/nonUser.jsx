import React from 'react'
import { Link } from 'react-router-dom'

export default function nonUser() {
  return (
      <div>
          <ul>
            <li><Link to='/signup'>Sign up</Link></li>
            <li><Link to='/signin'>Sign in</Link></li>   
          </ul>
    </div>
  )
}
