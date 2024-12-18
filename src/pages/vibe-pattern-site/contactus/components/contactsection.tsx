import { Phone, Mail, MapPin } from 'lucide-react'

export function ContactSection() {
  return (
    <section className='bg-[#F5F5F5] py-20 '>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center md:flex-row'>
          <div className='w-full flex-1 space-y-6 md:w-1/2'>
            <p className='font-medium text-[#D2B48C]'>CONTACT US</p>
            <h2 className='text-3xl font-semibold text-gray-900  sm:text-4xl lg:text-5xl'>
              CONTACT WITH US
            </h2>
            <p className='max-w-lg text-gray-600 '>
              Welcome to Vibe Pattern! We specialize in creating unique and
              customized interiors that reflect your personal style and needs.
              Our team is dedicated to blending aesthetics with functionality to
              bring your vision to life.
            </p>

            {[
              {
                icon: Phone,
                title: 'Call Us Now (Or) Whatsapp',
                content: '(+91) 6309 483 713',
              },
              { icon: Mail, title: 'Send Email', content: 'adityavarma@vibepattern.com' },
              {
                icon: MapPin,
                title: 'Our Locations',
                content: 'Visakhapatnam, Andhra Pradesh',
              },
            ].map((item, index) => (
              <div key={index} className='group flex items-center'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-white transition-colors duration-300 group-hover:bg-[#D2B48C] dark:bg-gray-800 sm:h-14 sm:w-14'>
                  <item.icon className='h-6 w-6 text-[#D2B48C] group-hover:text-white' />
                </div>
                <div className='ml-4'>
                  <p className='text-sm text-gray-600 '>{item.title}</p>
                  <p className='whitespace-pre-line text-lg font-medium text-gray-900  sm:text-xl'>
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* You can add a form or additional content here for the right side if needed */}
          <div className='mt-10 w-full flex-1 md:mt-0 md:w-1/2'>
            {/* Placeholder for additional content */}
          </div>
        </div>
      </div>
    </section>
  )
}
