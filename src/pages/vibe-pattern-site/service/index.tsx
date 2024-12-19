// @ts-nocheck
import { useEffect, useState } from 'react'
import FlowingBtn from '../components/flowingbtn'
import { FooterSection } from '../components/footer'
import { Navbar } from '../components/navbar'

import { Hero } from './components/hero'
import { NewServicesSection } from './components/newservicesection'
import { ServicesSection } from './components/servicesection'
import { useNavigate } from 'react-router-dom'

const Service = () => {
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      // Navigate to the dashboard if the user is logged in
      navigate('/dashboard')
    } else {
      // If no user is found, set a timer to redirect to the sign-in page
      const timer = setTimeout(() => {
        setRedirect(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [navigate])

  useEffect(() => {
    if (redirect) {
      navigate('/sign-in')
    }
  }, [redirect, navigate])
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
