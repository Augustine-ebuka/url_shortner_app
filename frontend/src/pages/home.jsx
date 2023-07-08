import React from 'react'
import HeroSection from '../component/heroSection'
import BusinessSection from '../component/businessSection'
import About from '../component/about'
import Reason from '../component/reason'

export default function Home() {
  return (
      <div>
          <HeroSection/>
      <BusinessSection />
      <About></About>
      <Reason></Reason>
    </div>
  )
}
