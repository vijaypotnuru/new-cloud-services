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

export default function AboutUs() {
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
