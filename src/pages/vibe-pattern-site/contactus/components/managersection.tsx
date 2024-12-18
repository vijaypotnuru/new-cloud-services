'use client'

import { useEffect, useState } from 'react'
import { Play, X } from 'lucide-react'
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
    <div className='-z-[1] bg-[#1E1E1E] py-20 2xl:py-[120px]'>
      <div className='container mx-auto'>
        <div className='grid w-full grid-cols-1 items-center lg:grid-cols-2'>
          <div
            className='relative h-[100%] w-full flex-1'
            data-aos='zoom-in-up'
          >
            <div className='relative h-[100%] w-full flex-1'>
              <img
                src='https://royellaa.netlify.app/images/home-1/action-img.png'
                className='h-full w-full object-cover md:h-[80%] lg:h-full'
                alt='Luxury Hotel Room'
              />
              <div
                className='absolute left-[45%] top-1/2 z-[1] flex h-[70px] w-[70px] cursor-pointer items-center justify-center rounded-full bg-[#C19D68] text-white md:top-[35%] lg:top-1/2'
                onClick={openModal}
              >
                <Play className='h-8 w-8' />
              </div>
              <span className='absolute left-[42%] top-[47%] h-[90px] w-[90px] animate-[ping_1s_ease-in-out_infinite] rounded-full border border-white md:top-[33%] lg:left-[43.5%] lg:top-[48%]'></span>
            </div>
          </div>

          <div
            className='dark:bg-normalBlack flex-1 space-y-5 bg-[#f8f6f3] px-5 py-10 font-serif sm:px-7 md:px-9 md:py-[96px] lg:pl-[70px] lg:pr-[70px]'
            data-aos='zoom-in-up'
          >
            <h5 className='font-serif text-base leading-[26px] text-[#C19D68]'>
              FOUNDER
            </h5>
            <h1 className='font-serif text-[22px] uppercase leading-[38px] text-black  sm:text-2xl md:text-[28px] lg:leading-[44px] xl:text-[32px] 2xl:text-[38px]'>
              Meet Vibe Pattern
            </h1>
            <p className='font-serif text-sm font-normal leading-[26px] text-gray-400 sm:text-base'>
              Welcome to Vibe Pattern, where every space tells a story. We
              specialize in creating customized interiors that blend aesthetics
              with functionality, tailored to your unique visionandneeds.
            </p>
            <p className='font-serif text-sm font-normal italic leading-[26px] text-gray-400 underline sm:text-base'>
              " Our designs are a balance of art and science, where beauty and
              function coexist in perfect harmony. "
            </p>
            <div className='flex items-center space-x-6 pt-5'>
              <img
                src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                className='h-[65px] w-[65px] object-cover'
                alt='Aditya Varma.N'
              />
              <div>
                <h4 className='font-serif text-lg leading-[26px] text-black sm:text-[22px]'>
                Aditya Varma.N
                </h4>
                <p className='flex items-center pt-1 font-serif text-base font-normal leading-[26px] text-gray-500'>
                  <span className='mr-2 inline-block h-2 h-[0.5px] w-5 bg-red-500'></span>
                  Founder
                </p>
              </div>
            </div>
          </div>
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
              videoId='82Egp9t9XKI'
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
