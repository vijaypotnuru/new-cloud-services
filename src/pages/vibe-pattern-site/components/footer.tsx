import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Button } from '@/components/custom/button'


const BrandBar = () => (
  <div className='bg-gradient-to-r from-blue-500 to-indigo-500 py-12'>
    <div
      className='container mx-auto flex flex-wrap items-center justify-center gap-8'
      data-aos='fade-up'
      data-aos-duration='1000'
    >
      <img src='/images/aws-logo.png' alt='AWS Partner' width={120} height={60} />
      <img src='/images/google-cloud-logo.png' alt='Google Cloud Partner' width={120} height={60} />
      <img src='/images/azure-logo.png' alt='Azure Partner' width={120} height={60} />
    </div>
  </div>
)

const SocialIcon = ({
  Icon,
  href = '/',
}: {
  Icon: React.ElementType
  href: string
}) => (
  <li className='hover-animBg group grid h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-400 border-opacity-75 transition-all duration-300 hover:border-blue-400 hover:bg-blue-500'>
    <a href={href}>
      <Icon className='h-5 w-5 text-gray-400 text-opacity-75 group-hover:text-white' />
    </a>
  </li>
)

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className='relative font-serif text-xl font-medium uppercase leading-[38px] text-white before:absolute before:left-0 before:top-10 before:h-[2px] before:w-12 before:bg-blue-400'>
    {children}
  </h2>
)

export function FooterSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const cloudServices = [
    { name: 'Cloud Hosting', link: '/services/hosting' },
    { name: 'Cloud Storage', link: '/services/storage' },
    { name: 'Cloud Computing', link: '/services/computing' },
    { name: 'AI & ML Services', link: '/services/ai-ml' },
    { name: 'IoT Solutions', link: '/services/iot' },
  ]

  const companyLinks = [
    { name: 'About Us', link: '/about' },
    { name: 'Our Team', link: '/team' },
    { name: 'Careers', link: '/careers' },
    { name: 'Contact Us', link: '/contact' },
    { name: 'Blog', link: '/blog' },
  ]

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-indigo-900">
      <BrandBar />
      <div className='container mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4'>
          {/* Company Info */}
          <div data-aos='fade-up' data-aos-duration='1000'>
            <img src='/images/logo-white.png' alt='CloudTech Solutions' width={180} height={60} className="mb-6" />
            <p className="text-gray-300 mb-6">
              Empowering businesses with cutting-edge cloud solutions. Your success is our priority.
            </p>
            <ul className='flex space-x-4'>
              <SocialIcon href='https://www.facebook.com/cloudtech' Icon={Facebook} />
              <SocialIcon href='https://twitter.com/cloudtech' Icon={Twitter} />
              <SocialIcon href='https://www.linkedin.com/company/cloudtech' Icon={Linkedin} />
              <SocialIcon href='https://github.com/cloudtech' Icon={Github} />
            </ul>
          </div>

          {/* Cloud Services */}
          <div data-aos='fade-up' data-aos-duration='1000' data-aos-delay='100'>
            <FooterHeading>CLOUD SERVICES</FooterHeading>
            <ul className='mt-6 space-y-4'>
              {cloudServices.map((service, index) => (
                <li key={index} className='text-gray-300 hover:text-blue-400 transition-colors duration-300'>
                  <Link to={service.link} className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div data-aos='fade-up' data-aos-duration='1000' data-aos-delay='200'>
            <FooterHeading>COMPANY</FooterHeading>
            <ul className='mt-6 space-y-4'>
              {companyLinks.map((link, index) => (
                <li key={index} className='text-gray-300 hover:text-blue-400 transition-colors duration-300'>
                  <Link to={link.link} className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div data-aos='fade-up' data-aos-duration='1000' data-aos-delay='300'>
            <FooterHeading>CONTACT US</FooterHeading>
            <ul className='mt-6 space-y-4'>
              <li className='flex items-center text-gray-300'>
                <Phone className='mr-3 h-5 w-5 text-blue-400' />
                +1 (555) 123-4567
              </li>
              <li className='flex items-center text-gray-300'>
                <Mail className='mr-3 h-5 w-5 text-blue-400' />
                info@cloudtech.com
              </li>
              <li className='flex items-center text-gray-300'>
                <MapPin className='mr-3 h-5 w-5 text-blue-400' />
                123 Cloud Street, Tech City, TC 12345
              </li>
            </ul>
            <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white">
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className='bg-blue-900 py-4 text-center text-sm text-gray-400'>
        © 2024 CloudTech Solutions. All Rights Reserved.
      </div>
    </footer>
  )
}

