import React from 'react'
import image1 from '../images/vase.jpg'
import image2 from '../images/collab.jpg'
import image3 from '../images/5157442.jpg'
import '../styles/module.reason.css'

export default function Reason() {
  return (
      <div className='reason-container'>
          <div className='reason-content'>
              <div className='mt-20 mb-10'><h1>Reasons To Use ushort</h1></div>
    
              <div className='reason-card-container'>
                  <div className='reason-card'>
                      <div className='reason-image-container'>
                          <img src={image1} alt='image1' />
                      </div>
                      <div className='reason-card-text'>
                          <h1>ushort Makes Links Memorable</h1>
                          <p>Research shows that you experience a rise in link interaction if the link appears appealing and concise. you can create a custom link url</p>
                      </div>
                  </div>
                  <div className='reason-card'>
                      <div className='reason-image-container'>
                          <img src={image2} alt='image1' />
                      </div>
                      <div className='reason-card-text'>
                          <h1>ushort Makes Links Memorable</h1>
                          <p>Our interface can be boring...... but why stick to it? Integrate URL shortening into you own applications with our public APIs</p>
                      </div>
                  </div>
                  <div className='reason-card'>
                      <div className='reason-image-container'>
                          <img src={image3} alt='image1' />
                      </div>
                      <div className='reason-card-text'>
                          <h1>ushort Makes Links Memorable</h1>
                          <p>Who doesn't like free stuff? We keep adding more functionalities while ensuring you keep accessing all features free of charge</p>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
