// @ts-nocheck
import FlowingBtn from '../components/flowingbtn'
import { FooterSection } from '../components/footer'
import { Navbar } from '../components/navbar'

import { Hero } from './components/hero'
import { NewServicesSection } from './components/newservicesection'
import { ServicesSection } from './components/servicesection'

const Service = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <Hero title='Services' backgroundImage='/images/cloud-background.png' />
      <NewServicesSection />
      {/* <ServicesSection /> */}
      <FooterSection />
      <FlowingBtn />
    </div>
  )
}

export default Service
