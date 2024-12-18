// @ts-nocheck
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const facilities = [
  {
    number: '01',
    category: 'INTERIOR',
    title: 'Residential Design',
    description:
      'Crafting spaces that feel like home with personalized touches and timeless style. Our residential design services focus on creating functional and aesthetically pleasing environments that reflect the unique personality and lifestyle of each client.',
    image: '/images/blog-1.png',
    align: 'right',
  },
  {
    number: '02',
    category: 'INTERIOR',
    title: 'Commercial Design',
    description:
      'Transforming workspaces that elevate productivity and create inviting atmospheres. We specialize in designing commercial spaces that not only meet the operational needs of businesses but also enhance the experience for employees and customers alike.',
    image: '/images/blog-2.png',
    align: 'left',
  },
  {
    number: '03',
    category: 'INTERIOR',
    title: 'Interior Renovation',
    description:
      'From concept to completion, bringing new life into existing spaces. Our renovation services are tailored to revitalize interiors, ensuring they are both modern and functional while preserving the essence of the original design.',
    image: '/images/blog-3.png',
    align: 'right',
  },
  {
    number: '04',
    category: 'INTERIOR',
    title: 'Furniture & Decor Sourcing',
    description:
      'Curated selections to complement your style and needs perfectly. We offer a comprehensive sourcing service that includes finding the perfect furniture and decor pieces to enhance your space, ensuring a cohesive and stylish look.',
    image: '/images/blog-4.png',
    align: 'left',
  },
  {
    number: '05',
    category: 'INTERIOR',
    title: 'Project Management',
    description:
      'Overseeing every detail to deliver exceptional results on time and within budget. Our project management services ensure that every aspect of your interior design project is handled with precision and care, from initial planning to final execution.',
    image: '/images/about-thumb.png',
    align: 'right',
  },
]

export function ServicesSection() {
  return (
    <section className='container py-[120px] md:py-0 md:pb-[120px] lg:py-[120px]'>
      <div
        className='mb-12 flex flex-col justify-between px-3 sm:px-5 md:flex-row md:items-center'
        data-aos-duration='1000'
        data-aos='fade-up'
      >
        <div className='font-Garamond md:w-[450px]'>
          <h5 className='mb-[14px] text-base font-medium leading-[26px] text-[#C19D68]'>
            FACILITIES
          </h5>
          <h1 className='font-serif text-[22px] leading-[38px] text-black sm:text-2xl md:text-3xl lg:leading-[44px]  2xl:text-[38px]'>
            ENJOY COMPLETE &amp; BEST QUALITY FACILITIES
          </h1>
        </div>
      </div>
      <div className=''>
        {facilities.map((facility, index) => (
          <div key={index}>
            <hr className='my-10  text-[#e8e8e8]' />
            <div
              className='grid grid-cols-1 md:grid-cols-2'
              data-aos-duration='1000'
              data-aos='zoom-in-up'
            >
              {facility.align === 'right' ? (
                <>
                  <div className='relative h-[87%] w-[87%] md:pr-[30px]'>
                    <img
                      src={facility.image}
                      alt=''
                      className='h-full w-full'
                    />
                    <div className='absolute -right-[7%] -top-[0px] hidden md:-right-[12%] md:block'>
                      <h2 className='font-serif text-3xl leading-[38px] text-[#C19D68] md:text-4xl lg:text-[40px]'>
                        {facility.number}
                      </h2>
                    </div>
                  </div>
                  <div className='font-Garamond relative mt-3 h-full md:ml-[60px] md:mt-0 lg:ml-[107px]'>
                    <h4 className='mt-2 pb-[6px] font-serif text-base uppercase  leading-[26px] text-[#C19D68] md:mt-0'>
                      {facility.category}
                    </h4>
                    <h1 className='font-serif text-2xl  leading-[26px] text-gray-800 md:text-3xl 2xl:text-[32px] '>
                      {facility.title}
                    </h1>
                    <p className='relative my-10 font-serif text-sm  font-normal leading-[26px] text-gray-400 before:absolute before:left-0 before:top-[-35px] before:h-[30px] before:w-[1px] before:bg-[#ddd] sm:text-base lg:mb-[40px] lg:mt-[46px]'>
                      {facility.description}
                    </p>

                    <ArrowRight
                      className='text-gray-400 hover:text-[#C19D68]'
                      size={30}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className='h-full font-serif md:mr-[2px] lg:mr-[110px]'>
                    <h4 className='pb-[6px] font-serif text-base uppercase leading-[26px] text-[#C19D68]'>
                      {facility.category}
                    </h4>
                    <h1 className='font-serif text-2xl leading-[26px] text-gray-800 md:text-3xl 2xl:text-[32px] '>
                      {facility.title}
                    </h1>
                    <p className='relative my-10 font-serif text-sm font-normal  leading-[26px] text-gray-400 before:absolute before:left-0 before:top-[-35px] before:h-[30px] before:w-[1px] before:bg-[#ddd] sm:text-base lg:mb-[40px] lg:mt-[46px]'>
                      {facility.description}
                    </p>

                    <ArrowRight
                      className='text-gray-400 hover:text-[#C19D68]'
                      size={30}
                    />
                  </div>
                  <div className='relative mt-5 h-[87%] w-[87%] md:mt-0 md:pl-[30px]'>
                    <img
                      src={facility.image}
                      alt=''
                      className='h-full w-full'
                    />
                    <div className='absolute -left-[12%] -top-[0px] hidden md:block'>
                      <h1 className='font-serif text-3xl leading-[38px] text-[#C19D68] md:text-4xl lg:text-[40px]'>
                        {facility.number}
                      </h1>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
