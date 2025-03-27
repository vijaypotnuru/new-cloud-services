'use client'

import { useEffect, useState } from 'react'
import { Play, X, Cloud, Server, Database } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import YouTube from 'react-youtube'

export const ManagerSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className='bg-gradient-to-r from-blue-900 to-indigo-900 py-20 2xl:py-[120px]'>
      <div className='container mx-auto px-4'>
        <div className='grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          <div
            className='relative h-[100%] w-full flex-1'
            data-aos='zoom-in-up'
          >
            <div className='relative h-[100%] w-full flex-1 overflow-hidden rounded-lg shadow-xl'>
              <img
                src='/images/data-center.jpg'
                className='h-full w-full object-cover'
                alt='Modern Data Center'
              />
              <div
                className='absolute left-1/2 top-1/2 z-[1] flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white transition-all hover:bg-blue-600'
                onClick={openModal}
              >
                <Play className='h-8 w-8' />
              </div>
              <span className='absolute left-1/2 top-1/2 h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 animate-[ping_1s_ease-in-out_infinite] rounded-full border border-blue-400'></span>
            </div>
          </div>

          <div
            className='flex-1 space-y-6 rounded-lg bg-white bg-opacity-10 px-6 py-10 font-sans backdrop-blur-lg sm:px-8 md:px-10 md:py-12'
            data-aos='zoom-in-up'
          >
            <h5 className='text-lg font-semibold leading-[26px] text-blue-400'>
              OUR LEADERSHIP
            </h5>
            <h1 className='text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl'>
              Innovating Cloud Solutions
            </h1>
            <p className='text-base font-normal leading-relaxed text-gray-300 sm:text-lg'>
              At CloudTech Solutions, we're dedicated to revolutionizing
              businesses through cutting-edge cloud technologies. Our team of
              experts is committed to delivering scalable, secure, and efficient
              cloud services tailored to your unique needs.
            </p>
            <p className='text-base font-normal italic leading-relaxed text-gray-300 sm:text-lg'>
              "In the era of digital transformation, our mission is to empower
              organizations with cloud solutions that drive innovation, enhance
              productivity, and ensure seamless growth."
            </p>
            {/* <div className='flex items-center space-x-6 pt-5'>
              <img
                src='/images/ceo-avatar.jpg'
                className='h-16 w-16 rounded-full object-cover'
                alt='Sarah Johnson'
              />
              <div>
                <h4 className='text-xl font-semibold leading-[26px] text-white sm:text-2xl'>
                  Sarah Johnson
                </h4>
                <p className='flex items-center pt-1 text-base font-normal leading-[26px] text-gray-300'>
                  <span className='mr-2 inline-block h-0.5 w-5 bg-blue-500'></span>
                  CEO & Cloud Strategist
                </p>
              </div>
            </div> */}
          </div>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          <FeatureCard
            icon={<Cloud className='h-10 w-10 text-blue-400' />}
            title='Cloud Infrastructure'
            description='Build and scale your applications with our robust cloud infrastructure, designed for high performance and reliability.'
          />
          <FeatureCard
            icon={<Server className='h-10 w-10 text-blue-400' />}
            title='Managed Services'
            description='Focus on your core business while we handle the complexities of cloud management, security, and optimization.'
          />
          <FeatureCard
            icon={<Database className='h-10 w-10 text-blue-400' />}
            title='Data Solutions'
            description='Harness the power of your data with our advanced analytics, machine learning, and big data solutions.'
          />
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='relative w-full max-w-3xl'>
            <button
              className='absolute -top-10 right-0 text-white hover:text-gray-300'
              onClick={closeModal}
            >
              <X className='h-8 w-8' />
              <span className='sr-only'>Close modal</span>
            </button>
            <YouTube
              videoId='7bM-iXFSsHg'
              opts={{
                width: '100%',
                height: '480',
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

const FeatureCard = ({ icon, title, description }: any) => (
  <div className='rounded-lg bg-white bg-opacity-10 p-6 backdrop-blur-lg transition-all hover:bg-opacity-20'>
    <div className='mb-4'>{icon}</div>
    <h3 className='mb-2 text-xl font-semibold text-white'>{title}</h3>
    <p className='text-gray-300'>{description}</p>
  </div>
)
