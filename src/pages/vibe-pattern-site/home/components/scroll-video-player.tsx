// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/custom/button'
import { LuxurySection } from './luxurysection'

gsap.registerPlugin(ScrollTrigger)

function smoothScroll(target: string) {
  const element = document.querySelector(target)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
    })
  }
}

export default function ScrollVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isSkipped, setIsSkipped] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.preload = 'auto'
      video.muted = true

      const handleLoadedData = () => {
        setIsVideoLoaded(true)
      }

      video.addEventListener('loadeddata', handleLoadedData)

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [])

  useEffect(() => {
    if (isVideoLoaded && containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 4,
        onUpdate: (self) => {
          if (!hasScrolled && self.progress > 0) {
            setHasScrolled(true)
          }
          if (hasScrolled && videoRef.current) {
            const video = videoRef.current
            const duration = video.duration
            const targetTime = duration * self.progress
            const currentTime = video.currentTime
            const smoothTime = currentTime + (targetTime - currentTime) * 0.1
            video.currentTime = smoothTime
          }
        },
      })
    }
  }, [isVideoLoaded, hasScrolled])

  const handleSkip = () => {
    setIsSkipped(true)
    smoothScroll('#next-section')
  }

  return (
    <>
      <div ref={containerRef} className='relative h-[800vh]'>
        <div className='sticky top-0 h-screen overflow-hidden'>
          <div className='relative h-full w-full'>
            <video
              ref={videoRef}
              className='absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2 object-cover md:h-full md:w-full'
              src='/cloud-video.mp4'
              playsInline
              loop
            />
            <div className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30'></div>
          </div>
          <AnimatePresence>
            {!hasScrolled && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className='absolute inset-0 flex flex-col items-center justify-center bg-[#000000] text-center text-white'
              >
                <h1 className='mb-4 text-6xl font-bold tracking-wider text-[#C19D68] lg:text-9xl'>
                  Discover Luxury
                </h1>
                <p className='mb-8 text-2xl font-light'>
                  Scroll to begin your journey
                </p>
                <ChevronDown className='mx-auto animate-bounce' size={48} />
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            className='absolute bottom-8 left-4 flex flex-col items-center gap-2 text-white sm:left-1/2 sm:-translate-x-1/2'
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <Button
              onClick={handleSkip}
              variant='outline'
              className='bg-white text-black hover:bg-gray-200'
            >
              Skip
            </Button>
            <ChevronDown className='animate-bounce' />
          </motion.div>
        </div>
      </div>
      <LuxurySection />
    </>
  )
}
