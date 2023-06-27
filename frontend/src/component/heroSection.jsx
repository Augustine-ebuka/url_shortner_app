import React from 'react'
import '../styles/module.heroSection.css'
import image from '../images/Short-URl-Banner2.svg'

export default function HeroSection() {
  return (
      <div className='hero-container'>
          <div className='hero-text'>
              <p>
                  <span className='font-bold block' >Make every connection count </span>Create short links, Share them
                  anywhere. Track what’s working, and what’s not. All inside the Ushort Connections Platform.
              </p>
              <div className='btn'>
                <h1>Get Started</h1>
              </div>
          </div>
          <div className='image-container'>
              <img src={image} alt='heroImage'></img>
          </div>
        
    </div>
  )
}
