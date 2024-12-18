// @ts-nocheck
import { Link } from 'react-router-dom'

export const Hero = ({
  title,
  backgroundImage,
}: {
  title: any
  backgroundImage?: any
}) => {
  return (
    <section
      className='relative grid h-[550px] items-center justify-center bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='absolute inset-0' />{' '}
      {/* Overlay for better text visibility */}
      <div className='relative z-10 mt-10 text-center'>
        <h1 className='font-serif text-3xl uppercase leading-10 text-white md:text-4xl lg:text-5xl lg:leading-[60px]  2xl:text-6xl 2xl:leading-[70px]'>
          {title}
        </h1>
        {/* <div className='flex items-center justify-center'>
          <Link
            to='/'
            className='flex items-center font-serif text-base leading-10 text-[#C19D68] lg:text-2xl 2xl:leading-[70px]'
          >
            Home
            <span className='mx-2 text-white'>/</span>
          </Link>
          <Link
            to='/contactus'
            className='font-serif text-base capitalize leading-10 text-white lg:text-2xl 2xl:leading-[70px]'
          >
            Contact Us
          </Link>
        </div> */}
      </div>
    </section>
  )
}
