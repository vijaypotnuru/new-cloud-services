import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu } from 'lucide-react'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleNavClick = () => {
    window.scrollTo(0, 0)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
    className={`z-20 w-full font-serif transition-all duration-300 fixed lg:fixed lg:px-5 lg:py-2 ${isScrolled ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'lg:bg-transparent'}`}
    >
      <div className='lg:px-10'>
        <div className='flex flex-col items-center justify-between lg:flex-row'>
          <div className='w-44 lg:w-32 lg:p-4'>
            <Link to='/'>
              <img
                src='/images/main-logo.png'
                className='hidden w-min lg:block'
                alt='website_logo'
              />
            </Link>
          </div>

          <div className='text-lightBlack flex h-[70px] w-full items-center justify-between bg-[#1E1E1E] p-3 px-3 dark:text-white lg:hidden lg:text-white'>
            <div className='w-28'>
              <Link to='/'>
                <img
                  src='/images/main-logo.png'
                  className='block lg:hidden'
                  alt='Vibe Pattern Logo'
                />
              </Link>
            </div>
            <div className='flex items-center'>
              <button
                className='block focus:outline-none lg:hidden'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className='h-5 w-5 text-white' />
              </button>
            </div>
          </div>

          <ul
            className={`${
              isMobileMenuOpen ? 'block' : 'hidden'
            } 3xl:space-x-[24px] mx-auto w-full flex-col space-x-0 space-y-2 bg-black py-3 text-left text-sm font-normal uppercase text-white ease-in-out lg:flex lg:w-fit lg:flex-row lg:space-x-3 lg:space-y-0 lg:bg-transparent lg:py-0 lg:text-center lg:text-white dark:lg:bg-transparent xl:space-x-4 2xl:space-x-5 relative lg:right-[67px]`}
          >
            {['Home', 'AboutUs', 'Services', 'ContactUs', "Login"].map((item) => (
              <NavLink
                key={item}
                to={item === 'Home' ? '/home' : `/${item.toLowerCase()}`}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `group relative block w-full px-3 py-2 text-black transition-all duration-300 dark:text-white lg:border-b-0 lg:text-white ${
                    isActive 
                      ? 'text-[#C19D68] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#C19D68] after:content-[""]' 
                      : 'hover:text-[#C19D68]'
                  }`
                }
              >
                <span className='flex items-center text-white justify-center'>
                  {item}
                  {['Rooms', 'Page', 'Blog'].includes(item) && (
                    <ChevronDown className='ml-1' size={16} />
                  )}
                </span>
                {['Rooms', 'Page', 'Blog'].includes(item) && (
                  <div className='absolute left-1/2 z-20 -translate-x-1/2 transform pt-5 lg:pt-8'>
                    <ul className='dark:bg-normalBlack hidden w-[200px] rounded-sm bg-white py-4 text-left text-sm text-black shadow-2xl transition-all duration-500 group-hover:block'>
                      <li className='px-4 py-2 hover:bg-gray-200'>Item 1</li>
                      <li className='px-4 py-2 hover:bg-gray-200'>Item 2</li>
                      <li className='px-4 py-2 hover:bg-gray-200'>Item 3</li>
                    </ul>
                  </div>
                )}
              </NavLink>  
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}