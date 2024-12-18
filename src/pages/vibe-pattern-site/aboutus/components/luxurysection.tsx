//@ts-nocheck
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Mail, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const LuxurySection = () => {
  const navigate = useNavigate()
  useEffect(() => {
    AOS.init({
      duration: 5000,
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
              Cloud Services Hub stands as a pioneering force in enterprise
              cloud computing and digital transformation, specializing in
              comprehensive cloud hosting, storage, and advanced computing
              solutions.
            </p>
            <p className='mt-5 font-serif text-sm font-normal leading-[26px] text-gray-400 sm:text-base'>
              As a leading organization in the field of cloud infrastructure,
              managed services, database management, and DevOps automation, we
              currently focus on delivering scalable cloud architectures that
              drive business innovation. At Cloud Services Hub, we emphasize
              technical excellence and enterprise-grade reliability in the IT
              sector.
            </p>
            <p className='mt-5 font-serif text-sm font-normal leading-[26px] text-gray-400 sm:text-base'>
              Our state-of-the-art data centers and operations facilities serve
              as innovation hubs where we provide cutting-edge cloud solutions
              for thousands of businesses worldwide.
            </p>
            <p className='mt-5 font-serif text-sm font-normal leading-[26px] text-gray-400 sm:text-base'>
              Cloud Services Hub was established in August 2014 and maintains
              its headquarters in Seattle, Washington (state), United States,
              with additional data centers strategically located across North
              America, Europe, and Asia-Pacific regions to ensure optimal
              performance and reliability for our global client base.
            </p>
            <div className='bg-[#F8F6F3] px-[30px] py-5'>
              <p className='3xl:leading-[50px] font-serif text-sm font-medium leading-10 text-[rgb(30,30,30)]  sm:text-base'>
                Visakhapatnam, Andhra Pradesh, India
              </p>
              <p className='font-serif text-sm font-medium leading-10 text-[rgb(30,30,30)]  sm:text-base'>
                Phone: (+91) 6309483713
              </p>
            </div>
            <button
              onClick={() => navigate('/service')}
              className='mt-[30px] bg-[#C19D68] px-10 py-4 text-white'
            >
              DISCOVER MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
