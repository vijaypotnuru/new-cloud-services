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

export default function Home() {
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
