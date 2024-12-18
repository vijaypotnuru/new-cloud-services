// @ts-nocheck
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const SocialIcon = ({ path }: { path: any }) => (
  <svg
    stroke='currentColor'
    fill='currentColor'
    strokeWidth='0'
    viewBox={path.viewBox}
    className='h-5 w-5 cursor-pointer transition-transform hover:scale-110'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d={path.d}></path>
  </svg>
)

const TeamMember = ({
  image,
  name,
  role,
  email,
  animation = 'fade-up',
}: {
  image: any
  name: any
  role: any
  email: any
  animation: any
}) => {
  const socialPaths = {
    facebook: {
      viewBox: '0 0 320 512',
      d: 'M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z',
    },
    twitter: {
      viewBox: '0 0 16 16',
      d: 'M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z',
    },
    linkedin: {
      viewBox: '0 0 448 512',
      d: 'M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z',
    },
    pinterest: {
      viewBox: '0 0 384 512',
      d: 'M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z',
    },
  }

  return (
    <div
      className='group border border-black p-7 transition-all duration-500 hover:bg-[#C19D68]'
      data-aos={animation}
      data-aos-duration='1000'
    >
      <div className='relative overflow-hidden '>
        <img src={image} className='w-full border border-gray-100' alt={name} />
        <div className='absolute inset-0 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-20'></div>
      </div>
      <div className='dark:bg-normalBlack relative bg-white transition-colors duration-300 group-hover:bg-[#C19D68]'>
        <div className='px-4 pb-7 pt-5 lg:px-[30px]'>
          <h3 className='text-center font-serif text-xl leading-7 text-black transition-colors duration-300 group-hover:text-white  sm:text-2xl md:leading-8 lg:text-2xl lg:leading-10 xl:text-[28px]'>
            {name}
          </h3>
          <p className='text-center font-serif text-sm font-normal leading-[26px] text-black transition-colors duration-300 group-hover:text-white md:text-base'>
            {role}
          </p>
        </div>
        <div className='hidden group-hover:block absolute bottom-[-150px] left-0 right-0 grid items-center justify-center bg-[#C19D68] p-[30px] transition-all duration-500 group-hover:bottom-0 sm:bottom-[-170px] md:bottom-[-150px]'>
          <div className='flex items-center justify-center space-x-4 text-white '>
            {Object.values(socialPaths).map((path, index) => (
              <SocialIcon key={index} path={path} />
            ))}
          </div>
          <p className='font-serif text-xl font-medium leading-10 text-white lg:text-[22px] text-center'>
            {email}
          </p>
        </div>
      </div>
    </div>
  )
}

export const TeamSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const teamMembers = [
    {
      name: 'Sample Name',
      role: 'Sample Role',
      image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      email: 'info@vibepattern.com',
      animation: 'fade-up',
    },
    {
      name: 'Suresh',
      role: 'Director',
      image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      email: 'info@vibepattern.com',
      animation: 'fade-down',
    },
    {
      name: 'Sample Name',
      role: 'Sample Role',
      image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      email: 'info@vibepattern.com',
      animation: 'fade-up',
    },
  ]

  return (
    <div className='py-20 2xl:py-[120px] bg-black'>
      <div className='container mx-auto'>
        <div
          className='mx-auto px-5 text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px]'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <div className='flex items-center justify-center space-x-2'>
            <hr className='bg-lightGray dark:bg-gray text-lightGray dark:text-gray h-[1px] w-[100px]' />
            <img
              src='images/inner-logo.png'
              alt='room_section_logo'
              className='h-[50px] w-[50px]'
            />
            <hr className='bg-lightGray dark:bg-gray text-lightGray dark:text-gray h-[1px] w-[100px]' />
          </div>
          <h1 className='mb-[14px] mt-[10px] font-serif text-xl uppercase leading-[42px] text-black sm:text-2xl md:text-3xl 2xl:text-[38px] 2xl:leading-[52px]'>
            MEET THE EXPER MEMBERS
          </h1>
          <p className='text-md font-serif font-normal leading-7 text-gray-400 sm:text-base lg:leading-[26px]'>
            Proactively morph optimal infomediaries rather than accurate
            expertise. Intrinsicly progressive resources rather than
            resource-leveling
          </p>
        </div>

        <div className='mt-[60px] grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3'>
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </div>
  )
}
