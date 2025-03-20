// @ts-nocheck

import { useEffect } from 'react'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function ContactSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us Now (Or) Whatsapp',
      content: '(+91) 0449738637',
    },
    { icon: Mail, title: 'Send Email', content: 'support@invtechnologies.com' },
    {
      icon: MapPin,
      title: 'Our Locations',
      content: 'Visakhapatnam, Andhra Pradesh',
    },
  ]

  return (
    <section className='relative overflow-hidden bg-gradient-to-r from-blue-300 to-indigo-500 py-16 md:py-24 lg:py-32'>
      <div className="absolute inset-0 animate-pulse bg-[url('/images/cloud-pattern.png')] opacity-10"></div>
      <div className='container relative z-10 mx-auto px-4 md:px-8'>
        <div
          className='mb-16 flex flex-col gap-8 md:flex-row md:items-end'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <div
            className='font-serif md:w-1/2'
            data-aos='fade-right'
            data-aos-duration='1000'
          >
            <h2 className='mb-4 text-lg font-medium uppercase tracking-wider text-white'>
              CONTACT US
            </h2>
            <h1 className='text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl'>
              GET IN TOUCH WITH US
            </h1>
          </div>
          <div
            className='md:w-1/2'
            data-aos='fade-left'
            data-aos-duration='1000'
          >
            <p className='text-lg text-gray-100'>
              Cloud Services Hub stands as a pioneering force in enterprise
              cloud computing and digital transformation, specializing in
              comprehensive cloud hosting, storage, and advanced computing
              solutions.
            </p>
          </div>
        </div>

        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className='group flex items-center rounded-lg bg-white bg-opacity-20 p-6 backdrop-blur-lg transition-all duration-300 hover:bg-opacity-30'
              data-aos='fade-up'
              data-aos-delay={index * 100}
            >
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white transition-colors duration-300 group-hover:bg-blue-600'>
                <item.icon className='h-6 w-6 text-blue-600 group-hover:text-white' />
              </div>
              <div className='ml-4'>
                <p className='text-sm text-gray-200'>{item.title}</p>
                <p className='text-lg font-medium text-white sm:text-xl'>
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className='mt-16 text-center'>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant='outline'
                size='lg'
                className='border-white text-white hover:bg-white hover:text-blue-600'
              >
                Contact Us Now
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white'>
              <DialogHeader>
                <DialogTitle className='text-2xl font-bold'>
                  Get in Touch
                </DialogTitle>
                <DialogDescription className='text-gray-200'>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </DialogDescription>
              </DialogHeader>
              <form className='mt-4 space-y-4'>
                <input
                  type='text'
                  placeholder='Your Name'
                  className='w-full rounded-md bg-white bg-opacity-20 p-2 text-white placeholder-gray-300'
                />
                <input
                  type='email'
                  placeholder='Your Email'
                  className='w-full rounded-md bg-white bg-opacity-20 p-2 text-white placeholder-gray-300'
                />
                <textarea
                  placeholder='Your Message'
                  rows={4}
                  className='w-full rounded-md bg-white bg-opacity-20 p-2 text-white placeholder-gray-300'
                ></textarea>
                <Button className='w-full bg-white text-blue-600 hover:bg-blue-100'>
                  Send Message
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div> */}
      </div>
    </section>
  )
}
