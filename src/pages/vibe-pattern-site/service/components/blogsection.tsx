//@ts-nocheck

import { useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'keen-slider/keen-slider.min.css'
import 'aos/dist/aos.css'

const blogPosts = [
  {
    image: 'https://royellaa.netlify.app/images/home-1/blog-1.jpg',
    date: '',
    category: 'Consultation',
    title: 'Understanding your vision, preferences, and goals.',
    animation: 'fade-up',
  },
  {
    image: 'https://royellaa.netlify.app/images/home-1/blog-2.jpg',
    date: '',
    category: 'Concept Development',
    title: 'Creating a design plan with visuals,layouts, and mood boards',
    animation: 'fade-down',
  },
  {
    image: 'https://royellaa.netlify.app/images/home-1/blog-3.jpg',
    date: '',
    category: 'Design Refinement',
    title: 'Fine-tuning details to ensure the perfect fit.',
    animation: 'fade-up',
  },
  {
    image: 'https://royellaa.netlify.app/images/home-1/blog-3.jpg',
    date: '',
    category: 'Execution',
    title:
      'Bringing your design to life with top-quality materials and skilled craftsmanship.',
    animation: 'fade-up',
  },
]

const BlogPost = ({ post }: { post: (typeof blogPosts)[number] }) => (
  <div
    className='3xl:w-[410px] group overflow-hidden'
    data-aos={post.animation}
    data-aos-duration='1000'
  >
    <div className='relative'>
      <img src={post.image} className='h-full w-full object-cover' alt='' />
    </div>
    <div className='border border-t-0 border-[#e8e8e8] font-serif dark:border-[#424242]'>
      <div className='px-[30px] py-6 lg:px-5 xl:px-[25px]'>
        <div className='flex items-center space-x-6'>
          {[post.date, post.category].map((item, index) => (
            <p
              key={index}
              className='relative ml-3 mr-7 font-serif text-sm uppercase leading-[26px] text-gray-600 before:absolute before:left-[-13px] before:top-[9px] before:h-[7px] before:w-[7px] before:bg-[#d1d1d1] dark:before:bg-primary lg:text-base'
            >
              {item}
            </p>
          ))}
        </div>
        <Link to='/blog'>
          <h2 className='py-2 font-serif text-xl leading-[34px]  text-black underline-offset-2 hover:underline  sm:py-3 sm:text-[22px] md:py-4 xl:text-2xl 2xl:text-[26px]'>
            {post.title}
          </h2>
        </Link>
      </div>
      {/* <div className='border-t-[1px] border-[#e8e8e8] py-2 dark:border-[#424242] lg:py-3'>
        <div className='flex items-center justify-between px-[30px]'>
          <div>
            <span className='flex items-center text-sm sm:text-base'>
              <span className='ml-[10px] font-medium uppercase leading-[38px] text-black underline-offset-1 hover:underline group-hover:text-[#c19d68] '>
                Read More
              </span>
            </span>
          </div>
          <span>
            <ArrowRight className='h-6 w-6 text-gray-600 group-hover:text-[#c19d68]' />
          </span>
        </div>
      </div> */}
    </div>
  </div>
)

export const BlogSection = () => {
  const [sliderRef] = useKeenSlider({
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
    <section className='container mx-auto py-20 lg:py-[120px]'>
      <div
        className='mx-auto px-5 text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px]'
        data-aos='fade-up'
        data-aos-duration='1000'
      >
        <div className='mb-4 flex items-center justify-center space-x-2'>
          <hr className='h-[1px] w-[100px] text-[#dedbd4] dark:text-[#3b3b3b]' />
          <img
            src='/images/inner-logo.png'
            alt='room_section_logo'
            className='h-[50px] w-[50px]'
          />
          <hr className='h-[1px] w-[100px] text-[#c19d68]' />
        </div>
        <h1 className='mb-[8px] font-serif text-xl uppercase leading-[44px] text-black sm:text-2xl  md:text-3xl lg:leading-[52px] 2xl:text-[38px]'>
          OUR DESIGN PROCESS
        </h1>
        <p className='dark:text-lightGray font-serif text-sm font-normal leading-[26px] text-gray-400 sm:text-base'>
          Our design process is centered around understanding your unique needs
          and preferences. We strive to create spaces that are not only
          aesthetically pleasing but also functional and tailored to your
          lifestyle.
        </p>
      </div>

      <div className='relative'>
        <div ref={sliderRef} className='keen-slider mt-14 2xl:mt-[60px]'>
          {blogPosts.map((post, index) => (
            <div key={index} className='keen-slider__slide'>
              <BlogPost post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
