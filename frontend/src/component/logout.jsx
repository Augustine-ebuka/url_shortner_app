import React from 'react'
import axios from './httpClient'
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Logout({props}) {
    const navigate = useNavigate();
    const [logout, setLogout] = useState(false)
   
        let logoutUser = async () => { 
            const res = await axios('http://localhost:5000/users/logout')
            if (res.status === 200) {
                setLogout(true)
                console.log(res.data.message);
                toast.success("logged out successfully")
                navigate('/')  
            } else {
                console.log("cant log out right now");
            }
        }
        
  return (
      <li onClick={logoutUser}>
          <Toaster></Toaster>
          <Link>Log out</Link> 
    </li>
  )
}
