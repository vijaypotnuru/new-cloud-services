// @ts-nocheck
import { Navbar } from '../components/navbar'
import { Hero } from './components/hero'
import { LuxurySection } from './components/luxurysection'
import { TeamSection } from './components/teamsection'
import { TestimonialsSection } from './components/testimonialssection'
import { BlogSection } from './components/blogsection'
import { FooterSection } from '../components/footer'
import { ManagerSection } from './components/managersection'
import FlowingBtn from '../components/flowingbtn'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

  /**
   * Renders the About Us page.
   *
   * This page contains the luxury section, and links to the manager, team, testimonials, and blog sections.
   *
   * @returns {React.ReactElement} The About Us page.
   */
export default function AboutUs() {
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
      <Hero title='ABOUT US' backgroundImage='/images/cloud-background.png' />

      <LuxurySection />
      {/* <ManagerSection /> */}
      {/* <TeamSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <BlogSection /> */}
      <FooterSection />
      <FlowingBtn />
    </div>
  )
}
