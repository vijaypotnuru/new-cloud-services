'use client'

import { useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import AOS from 'aos'
import 'keen-slider/keen-slider.min.css'
import 'aos/dist/aos.css'

const testimonials = [
  {
    name: 'Kiran',
    location: 'Bangalore, India',
    image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    text: 'Vibe Pattern transformed our home beautifully. Their attention to detail and ability to blend modern aesthetics with functionality exceeded our expectations. The team was professional and completed the project on time.',
  },
  {
    name: 'Sai Kumar',
    location: 'Visakhapatnam, India',
    image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    text: 'Outstanding interior design service! They perfectly captured our vision for our office space. The creative use of colors and space planning has significantly improved our work environment.',
  },
  {
    name: 'Naju',
    location: 'Visakhapatnam, India',
    image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    text: 'We are extremely satisfied with our home renovation. The designers were excellent at incorporating our cultural preferences while maintaining a contemporary feel. Their material selection was top-notch.',
  },
  {
    name: 'Santosh',
    location: 'Mumbai, India',
    image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    text: 'The team at Vibe Pattern has an incredible eye for design. They transformed our outdated living space into a modern, elegant home. Their space optimization solutions were brilliant.',
  },
  {
    name: 'Durga',
    location: 'Visakhapatnam, India',
    image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    text: 'Exceptional service from start to finish. The designers listened to our needs and created a perfect balance of luxury and comfort in our home. Their attention to budget management was impressive.',
  },
]

export const TestimonialsSection = () => {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 2, spacing: 20 },
      },
      '(max-width: 768px)': {
        slides: { perView: 1, spacing: 20 },
      },
    },
  })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <section className='dark:bg-lightBlack bg-[#f8f6f3] py-20 lg:py-[120px]'>
      <div className='container mx-auto px-4'>
        <div
          className='relative flex items-start justify-between'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <div className='space-y-3 font-serif md:w-[450px] xl:w-[550px]'>
            <h5 className='text-base font-medium leading-[26px] text-[#C19D68]'>
              LUXURY FEEDBACK
            </h5>
            <h1 className='text-[22px] uppercase leading-6 text-black sm:text-3xl md:leading-[38px]  lg:leading-[44px] 2xl:text-[38px]'>
              RESOTE CLIENTS FEEDBACK ABOUT SERVICES
            </h1>
          </div>

          <div className='hidden items-center space-x-3 sm:flex lg:space-x-5'>
            <button
              onClick={() => instanceRef.current?.prev()}
              className='group flex h-[30px] w-[30px] items-center justify-center border border-[#cccbc8] text-[#cccbc8] hover:border-none hover:bg-[#C19D68] lg:h-[50px] lg:w-[50px]'
            >
              <ChevronLeft className='h-5 w-5 text-[#cccbc8] group-hover:text-white' />
            </button>
            <button
              onClick={() => instanceRef.current?.next()}
              className='group flex h-[30px] w-[30px] items-center justify-center border border-[#cccbc8] text-[#cccbc8] hover:border-none hover:bg-[#C19D68] lg:h-[50px] lg:w-[50px]'
            >
              <ChevronRight className='h-5 w-5 text-[#cccbc8] group-hover:text-white' />
            </button>
          </div>
        </div>

        <hr className='mt-10 h-[1px] w-full text-[#383838]' />

        <div
          className='relative'
          data-aos='zoom-in-up'
          data-aos-duration='1000'
        >
          <div ref={sliderRef} className='keen-slider mt-[60px]'>
            {testimonials.map((testimonial, index) => (
              <div key={index} className='keen-slider__slide group'>
                <div className='dark:bg-normalBlack dark:before:bg-normalBlack relative bg-white p-[30px] transition-all duration-500 ease-in-out before:absolute before:-bottom-[13px] before:left-[37px] before:h-6 before:w-6 before:rotate-45 before:bg-white group-hover:bg-[#C19D68] before:group-hover:bg-[#C19D68] hover:bg-[#C19D68]'>
                  <span className='flex items-center space-x-[5px] md:space-x-2 xl:space-x-3'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className='text-[#C19D68] group-hover:text-white'
                        size={18}
                        fill='currentColor'
                      />
                    ))}
                  </span>
                  <p className='dark:text-lightGray mt-7 font-serif text-sm font-normal leading-[26px] text-gray-600 group-hover:text-white lg:text-base'>
                    {testimonial.text}
                  </p>
                </div>
                <div className='mt-10 flex items-center lg:mt-[51px]'>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className='h-16 w-16 rounded-full object-cover'
                  />
                  <div className='ml-5 md:ml-6'>
                    <h4 className='font-serif text-lg font-medium leading-[28px] text-[#041341]  sm:text-xl md:text-2xl'>
                      {testimonial.name}
                    </h4>
                    <p className='font-serif text-sm font-normal leading-7 text-gray-500 sm:text-base'>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
