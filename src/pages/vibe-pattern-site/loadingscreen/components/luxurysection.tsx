//@ts-nocheck
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Mail, Phone } from "lucide-react"

export const LuxurySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <section className='bg-mediumBlack'>
      <div className='container mx-auto py-20 sm:overflow-hidden lg:overflow-auto 2xl:py-[120px]'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          <div className='flex-1' data-aos='zoom-in-up'>
            <img
              src='/images/about-thumb.png'
              alt='Interior Design'
              className='h-full w-full'
            />
          </div>
          <div
            className='mt-10 flex-1 space-y-3 font-serif md:ml-10 md:mt-0 lg:ml-[90px] xl:space-y-4 2xl:ml-[100px]'
            data-aos='zoom-in-down'
          >
            <h5 className='text-base font-medium leading-[26px] text-[#C19D68]'>
              INTERIOR DESIGN EXPERTS
            </h5>
            <h1 className='my-4 text-[22px] leading-6 text-black sm:text-2xl md:text-[21px] md:leading-7 lg:leading-[30px] xl:text-3xl  2xl:text-[38px]  2xl:leading-[44px]'>
              TRANSFORMING SPACES INTO LUXURIOUS LIVING
            </h1>
            <p className='font-serif text-sm font-normal leading-[26px] text-gray-400 md:text-sm lg:text-base xl:text-base'>
              Our mission is to create stunning interiors that reflect your unique style and enhance your living experience. We blend functionality with elegance, ensuring every space is both beautiful and practical.
            </p>
            <p className='mt-5 font-serif text-sm font-normal leading-[26px] text-gray-400 sm:text-base'>
              From concept to completion, our team of skilled designers works closely with you to bring your vision to life. We specialize in creating harmonious environments that inspire and rejuvenate.
            </p>
            <div className='bg-[#F8F6F3] px-[30px] py-5'>
              <p className='3xl:leading-[50px] font-serif text-sm font-medium leading-10 text-[rgb(30,30,30)]  sm:text-base'>
              Visakhapatnam, Andhra Pradesh, India
              </p>
              <p className='font-serif text-sm font-medium leading-10 text-[rgb(30,30,30)]  sm:text-base'>
                Phone:  (+91) 6309483713
              </p>
            </div>
            <button className='bg-[#C19D68] mt-[30px] text-white px-10 py-4'>
              DISCOVER MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
