import React from 'react'
import { useState} from 'react'
import '../styles/module.businessSection.css'
import { BiCopy } from 'react-icons/bi'
import axios from './httpClient'
import { useNavigate } from 'react-router-dom';


export default function BusinessSection() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate()
  // function to handle submit form
  const handlesubmit =async (event) => { 
    event.preventDefault();
    try {
      const response = await axios('http://localhost:5000/users/signin/is_logged_in');
      if (response.status === 200) {
        const createLink = await axios.post('http://localhost:5000/', { "long_url":longUrl })
        if (createLink.status === 200) {
          setShortUrl(createLink.data.short_url);
        }
      }
    } catch (error) {
      console.log(error);
      navigate('/signin')
      
    }
  }


  const copyShortUrl = () => {
    const shortUrlElement = document.querySelector('.shorturl p');
    if (shortUrlElement) {
      const shortUrl = shortUrlElement.innerText;
      navigator.clipboard.writeText(shortUrl)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
        })
        .catch((error) => {
          console.error('Failed to copy: ', error);
        });
    }
  };
  
  
 
  return (
      <div className='business-container'>
          <div className='business-content'>
              <div className='text'>
                  <h1> What Link would you like to short?</h1>
              </div>
              <div className='forms'>
                  <div className='form-container'>  
                  <h1>Shorten a long link</h1>    
                      <form method='post' action="" onSubmit={handlesubmit} >
                          <label htmlFor="input1">Paste a long URL</label>
                          <input name='longurl' type="url" className='input1' value={longUrl} onChange={(event)=>{setLongUrl(event.target.value)}} required></input>
                          <div className='below'>
                              <div className='input-data'>
                                <label htmlFor="">Domain</label>
                                <input disabled placeholder='ushort.ly/'></input>  
                              </div>

                              <div  className='input-data'>
                                <label htmlFor="">Short Url</label>
                                <div className='shorturl'>
                                  <p>{shortUrl}</p>
                                  <BiCopy size={25} onClick={copyShortUrl} className={isCopied ? 'copied' : ''} />
                                </div>
                              </div>
                          </div>
                          <button type='submit'>Get short url</button>
                    </form>
                  </div>
              </div>
              
          </div>
          
    </div>
  )
}
