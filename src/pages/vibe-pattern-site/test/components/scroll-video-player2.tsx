// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollVideoPlayer2() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.preload = 'auto'
      video.muted = true

      const handleLoadedData = () => {
        setIsVideoLoaded(true)
        if (video.duration) {
          video.currentTime = 0
        }
      }

      video.addEventListener('loadeddata', handleLoadedData)
      video.load()

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [])

  useEffect(() => {
    if (isVideoLoaded && videoRef.current && containerRef.current) {
      const video = videoRef.current
      const duration = video.duration

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = duration * self.progress
          }
        },
      })
    }
  }, [isVideoLoaded])

  return (
    <div ref={containerRef} className='relative h-[300vh]'>
      <div className='sticky top-0 h-screen overflow-hidden'>
        <video
          ref={videoRef}
          className='h-full w-full object-cover'
          src='/door2.mp4'
          playsInline
          muted
        />
      </div>
    </div>
  )
}
