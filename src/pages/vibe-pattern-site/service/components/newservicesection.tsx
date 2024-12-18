'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { facilities } from './data'
import { FacilityItem } from './facility-item'

export function NewServicesSection() {
  const [activeService, setActiveService] = useState(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

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
              CLOUD SERVICES
            </h2>
            <h1 className='text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl'>
              EXPLORE OUR CLOUD SERVICES
            </h1>
          </div>
          <div
            className='md:w-1/2'
            data-aos='fade-left'
            data-aos-duration='1000'
          >
            <p className='text-lg text-gray-100'>
              Discover our comprehensive range of cloud services, designed to
              help you achieve your business goals. From cloud hosting to AI and
              ML services, we've got you covered.
            </p>
          </div>
        </div>

        <Tabs defaultValue='all' className='mb-12'>
          <TabsList className='bg-white bg-opacity-20 backdrop-blur-lg'>
            <TabsTrigger
              value='all'
              className='text-white data-[state=active]:bg-white data-[state=active]:text-blue-600'
            >
              All Services
            </TabsTrigger>
            <TabsTrigger
              value='hosting'
              className='text-white data-[state=active]:bg-white data-[state=active]:text-blue-600'
            >
              Hosting
            </TabsTrigger>
            <TabsTrigger
              value='storage'
              className='text-white data-[state=active]:bg-white data-[state=active]:text-blue-600'
            >
              Storage
            </TabsTrigger>
            <TabsTrigger
              value='computing'
              className='text-white data-[state=active]:bg-white data-[state=active]:text-blue-600'
            >
              Computing
            </TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='space-y-16 md:space-y-8'>
            {facilities.map((facility, index) => (
              <FacilityItem
                key={index}
                facility={facility}
                setActiveService={setActiveService}
              />
            ))}
          </TabsContent>
          <TabsContent value='hosting' className='space-y-16 md:space-y-8'>
            <FacilityItem
              facility={facilities[0]}
              setActiveService={setActiveService}
            />
          </TabsContent>
          <TabsContent value='storage' className='space-y-16 md:space-y-8'>
            <FacilityItem
              facility={facilities[1]}
              setActiveService={setActiveService}
            />
          </TabsContent>
          <TabsContent value='computing' className='space-y-16 md:space-y-8'>
            <FacilityItem
              facility={facilities[2]}
              setActiveService={setActiveService}
            />
          </TabsContent>
        </Tabs>

        {/* <div className='mt-16 text-center'>
          <Button
            variant='outline'
            size='lg'
            className='border-white text-inherit hover:bg-white hover:text-blue-600'
          >
            View All Services
            <ChevronDown className='ml-2 h-4 w-4' />
          </Button>
        </div> */}
      </div>

      {/* <Dialog>
        <DialogTrigger asChild>
          <Button
            className='fixed bottom-4 right-4 z-50 bg-white text-blue-600 shadow-lg hover:bg-blue-100'
            onClick={() => setActiveService(null)}
          >
            Need Help?
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-gradient-to-r from-blue-500 to-indigo-500 text-white'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-bold'>
              {activeService
                ? `About ${activeService.title}`
                : 'How can we help you?'}
            </DialogTitle>
            <DialogDescription className='text-gray-200'>
              {activeService
                ? activeService.description
                : 'Select a service above to learn more, or contact our support team for personalized assistance.'}
            </DialogDescription>
          </DialogHeader>
          {!activeService && (
            <div className='mt-4'>
              <Button className='w-full bg-white text-blue-600 hover:bg-blue-100'>
                Contact Support
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog> */}
    </section>
  )
}
