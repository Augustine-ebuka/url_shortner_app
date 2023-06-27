import React from 'react'
import { useState} from 'react'
import '../styles/module.businessSection.css'
import {BiCopy} from 'react-icons/bi'

export default function BusinessSection() {
  const [longUrl, setLongUrl] = useState();
  const [shortUrl, setShortUrl] = useState();
  const [isCopied, setIsCopied] = useState(false);

  // function to handle submit form
  const handlesubmit = (event) => { 
    event.preventDefault();
    
    const formD = new FormData();
    formD.append('longurl', longUrl); // Append the 'longUrl' value to the FormData
    
    try {
      fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        body: formD // Pass the FormData object as the request body
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.long_url);
          setShortUrl(data.short_url); // Handle the response data
        })
        .catch((error) => {
          console.error(error); // Handle errors
        });
    } catch (error) {
      console.error(error); // Handle errors
    }
  }

  // copy function

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
                          <button>Get short url</button>
                    </form>
                  </div>
              </div>
              
          </div>
          
    </div>
  )
}
