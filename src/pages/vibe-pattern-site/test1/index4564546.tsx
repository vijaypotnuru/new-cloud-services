'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Menu, X, ChevronDown, Star, Users, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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
          video.currentTime = duration * self.progress
        },
      })
    }
  }, [isVideoLoaded])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-3xl font-bold text-indigo-600">Logo</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
              <Link to="/home" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-medium transition-colors duration-200">
                Home
              </Link>
              <Link to="/aboutus" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-medium transition-colors duration-200">
                About Us
              </Link>
              <Link to="/contactus" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500 text-sm font-medium transition-colors duration-200">
                 Contact Us
              </Link>
              <Link to="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors duration-200">
                Login
              </Link>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden absolute w-full bg-white shadow-lg">
            <div className="pt-2 pb-3 space-y-1">
              <Link to="/home" className="text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-indigo-500 transition-colors duration-200">
                Home
              </Link>
              <Link to="/aboutus" className="text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-indigo-500 transition-colors duration-200">
                About Us
              </Link>
              <Link to="/contactus" className="text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-indigo-500 transition-colors duration-200">
                Contact Us
              </Link>
              <Link to="/login" className="text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-indigo-500 transition-colors duration-200">
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Video scroll section */}
      <section id="home" ref={containerRef} className="relative h-[300vh] bg-black">
        <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/video.mp4"
            playsInline
            muted
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center max-w-4xl px-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">Welcome to Our Website</h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-10">Discover amazing things with us and transform your digital experience</p>
              <Link to="#features" className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 inline-flex items-center">
                Learn More
                <ChevronDown className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 max-w-3xl">
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-100 ease-out"
                style={{
                  width: `${videoRef.current ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Innovative Design', description: 'Create stunning visuals with our cutting-edge design tools', icon: Zap },
              { title: 'Collaborative Platform', description: 'Work seamlessly with your team in real-time', icon: Users },
              { title: 'Advanced Analytics', description: 'Gain valuable insights with our powerful analytics suite', icon: Star },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-indigo-600 mb-4">
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section id="testimonials" className="py-24 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: 'John Doe', quote: 'This product has revolutionized our workflow. It\'s an absolute game-changer!', role: 'CEO, Tech Innovators' },
              { name: 'Jane Smith', quote: 'I cannot recommend this service enough. It\'s intuitive, powerful, and has saved us countless hours.', role: 'Marketing Director, Global Solutions' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-600 rounded-full p-2 mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}