import React from 'react'
import HeroSection from '../component/heroSection'
import BusinessSection from '../component/businessSection'
import About from '../component/about'
import Reason from '../component/reason'
import Footer from '../component/footer'

export default function Home() {
  return (
      <div>
          <HeroSection/>
      <BusinessSection />
      <About></About>
      <Reason></Reason>
      <Footer></Footer>
    </div>
  )
}
