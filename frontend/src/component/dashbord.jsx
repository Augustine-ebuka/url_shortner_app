import React, { useEffect, useState, useRef } from 'react';
import '../styles/module.dashboard.css';
import { FiLink } from 'react-icons/fi';
import { RiBarChartFill } from 'react-icons/ri';
import axios from './httpClient';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    // const [login, setLogin] = useState(false);
    const [username, setUsername] = useState();
    const [userLinks, setUserLinks] = useState([]);
    const [activeLinkId, setActiveLinkId] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [longUrl, setLongUrl] = useState('');
  
    const navigate = useNavigate();
//   fetch data fro an
    // 
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Check if the user is logged in
          const loggedInResponse = await axios.get('http://localhost:5000/users/signin/is_logged_in');
          if (loggedInResponse.status === 200) {
            // setLogin(true);
            setUsername(loggedInResponse.data.email);
  
            // Fetch all user links
            const linksResponse = await axios.get('http://localhost:5000/users/links');
            if (linksResponse.status === 200) {
              setUserLinks(linksResponse.data.links);
            }
          } else {
            // setLogin(false);
            navigate('/signin');
          }
        } catch (error) {
          console.log(error);
          navigate('/signin');
        }
      };
  
      fetchData();
    }, [navigate]);

    // delete a link
    const deleteLink = async () => {
        try {
          const res = await axios.delete(`http://localhost:5000/user/links/delete/${activeLinkId}`);
          if (res.status === 200) {
            console.log('delete link succeeded');
    
            // Update the userLinks state by filtering out the deleted link
            setUserLinks((prevLinks) => prevLinks.filter((link) => link.id !== activeLinkId));
    
            // Reset the activeLinkId
            setActiveLinkId('');
          }
        } catch (error) {
          console.log(error);
        }
      };

    // set id of a link
    const handleClick = (linkId) => {
      setActiveLinkId(linkId);
    };

    // copy short url
   const shortUrlElement = useRef(null)
    const copyShortUrl = () => {
        const getShorturl = shortUrlElement.current.textContent
        if (getShorturl) {
          navigator.clipboard.writeText(getShorturl)
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
    
    const handlesubmit =async (event) => { 
        event.preventDefault();
        try {
            const createLink = await axios.post('http://localhost:5000/', { "long_url":longUrl })
            if (createLink.status === 200) {
              console.log('Successfully created');
            }
        } catch (error) {
          console.log(error);
          
        }
      }
  
    return (
      <div className='dashboard-container'>
        <div className='dashboard-content'>
          <div className='dashboard-header'>
            <p>{username}</p>
            <h1>Make every connection count</h1>
          </div>
          <div className='dashboard-search'>
            <form className='dashboard-form'>
            <input name='longurl' type="url" className='input1' value={longUrl} onChange={(event)=>{setLongUrl(event.target.value)}} required></input>
              <button onClick={handlesubmit}>Ushort</button>
            </form>
          </div>
          <div className='dashboard-data'>
            <div className='dashboard-left'>
              <div className='data-heading'>
                <div>
                  <p>{userLinks.length} link(s)</p>
                </div>
                <div>
                  <p>All-time clicks</p>
                </div>
              </div>
              {/* Header ends here */}
              {/* Link list starts here */}
              {userLinks.map((link) => (
                <div
                  className={activeLinkId === link.id ? 'active link-data' : 'link-data'}
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                >
                  <div>
                    <FiLink size={40} />
                  </div>
                  <div className='flex-column gap-6 justify-between text-sm'>
                    <p className='pb-2'>{link.created_at}</p>
                    <p className='font-bold pb-2'>{link.title}</p>
                    <p>{link.slug}</p>
                  </div>
                  <div className='flex-column gap-6 justify-start items-start text-sm p-3 pb-3'>
                    <p className='pb-2'>Clicks</p>
                    <p className='pb-2'>{link.clicks}</p>
                    <RiBarChartFill />
                  </div>
                </div>
              ))}
            </div>
            {/* Link list ends here */}
            <div className='dashboard-right'>
              <div className='data-wrapper'>
                {userLinks.find((link) => link.id === activeLinkId) ? (
                  userLinks.map((link) => (
                    <div key={link.id}>
                      {link.id === activeLinkId && (
                        <>
                          <div>
                            <p className='text-md font-bold'>{link.created_at}</p>
                          </div>
                          <div>
                            <p className='font-bold text-lg'></p>
                          </div>
                          <p className='text-sm long-url'>{link.long_url}</p>
                          <div className='flex justify-start gap-8'>
                            <p className='font-bold' ref={shortUrlElement}>{link.short_url}</p>
                            <div className='flex justify-center gap-3'>
                              <button onClick={copyShortUrl}>{ isCopied ? 'copied!': 'copy'}</button>
                              <button>Edit</button>
                              <button onClick={deleteLink}>Delete</button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                ) : (
                  <div>Not found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  