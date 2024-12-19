// @ts-nocheck
import { Navbar } from '../components/navbar'
import { Hero } from './components/hero'

import FlowingBtn from '../components/flowingbtn'
import { Hero2 } from './components/hero2'
import { LuxurySection } from '../aboutus/components/luxurysection'
import { ManagerSection } from '../aboutus/components/managersection'
import { TeamSection } from '../aboutus/components/teamsection'
import { TestimonialsSection } from '../aboutus/components/testimonialssection'
import { BlogSection } from '../aboutus/components/blogsection'
import { FooterSection } from '../components/footer'
import ScrollVideoPlayer from './components/scroll-video-player'
import ScrollVideoPlayer2 from './components/scroll-video-player2'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Home() {
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      // Navigate to the dashboard if the user is logged in
      // navigate('/')
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
      <Hero
        title='Cloud Services'
        backgroundImage='/images/cloud-background.png'
      />

      {/* <ScrollVideoPlayer /> */}
      {/* <ScrollVideoPlayer2 /> */}
      {/* <Hero2 /> */}
      {/* <LuxurySection /> */}

      <ManagerSection />
      {/* <TeamSection /> */}
      {/* <TestimonialsSection /> */}
      <BlogSection />
      <FooterSection />
      <FlowingBtn />
    </div>
  )
}
