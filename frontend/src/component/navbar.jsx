import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/module.navbar.css'
import { Link } from 'react-router-dom'
import axios from './httpClient'
import nonUser from './nonUser'
import Logout from './logout'


export default function Navbar() {
    const [email, setEmail] = useState()
    const [login, setLogin] = useState(false)
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios('http://localhost:5000/users/signin/is_logged_in');
              if (response.status !== 200) {
                setLogin(false)
              return
            } else {
                setLogin(true)
                setEmail(response.data.username)
              console.log(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, []);
  return (
      <div className='navbarContainer'>
          <div className='logo'>
              <Link to='/'><h1>Ushort</h1></Link>
          </div>
          <div className='menu-list'>
              <ul>
              <div>
                      {login ? (
                          <ul>
                              <li className='text-white'>{email} </li>
                              <li className='text-white'><Link to='/dashboard'>Dashboard</Link> </li>
                              <Logout></Logout>
                          </ul>
                    
                ) : (
                     <ul>
                        <li><Link to='/signup'>Sign up</Link></li>
                        <li><Link to='/signin'>Sign in</Link></li>  
                    </ul>
            
                )}
                </div>
              </ul>
          </div>
    </div>
  )
}
