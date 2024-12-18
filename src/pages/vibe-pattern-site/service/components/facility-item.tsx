'use client'

import { useState } from 'react'
import { ArrowRight, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/custom/button'
import { motion, AnimatePresence } from 'framer-motion'

export const FacilityItem = ({
  facility,
  setActiveService,
}: {
  facility: any
  setActiveService: any
}) => {
  const { number, category, title, description, image, align, features } =
    facility
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className='w-full rounded-lg bg-white bg-opacity-10 py-8 backdrop-blur-md transition-all duration-300 hover:shadow-xl md:py-12'
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`container mx-auto flex flex-col px-4 md:px-8 ${align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-16`}
      >
        <div className='relative w-full md:w-1/2'>
          <img
            src={image}
            alt={title}
            className='h-auto w-full rounded-lg object-cover shadow-lg transition-transform duration-300 hover:scale-105'
          />
          <div
            className={`absolute ${align === 'left' ? '-left-4' : '-right-4'} -top-4 hidden md:block`}
          >
            <h2 className='font-serif text-6xl text-indigo-600 opacity-50 md:text-7xl lg:text-8xl'>
              {number}
            </h2>
          </div>
        </div>
        <div className='w-full space-y-6 font-serif md:w-1/2'>
          <h3 className='text-lg uppercase tracking-wider text-gray-200'>
            {category}
          </h3>
          <h2 className='text-3xl font-bold text-white md:text-4xl 2xl:text-5xl'>
            {title}
          </h2>
          <p className='relative pl-8 text-base text-gray-100 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-current md:text-lg'>
            {description}
          </p>
          <div className='flex flex-wrap gap-4'>
            <Button
              variant='outline'
              className='group flex items-center space-x-2 border-white text-indigo-600 transition-all duration-300 hover:bg-white hover:text-blue-600'
              onClick={() => setActiveService(facility)}
            >
              Learn More
              <ArrowRight
                size={24}
                className='ml-2 transition-transform duration-300 group-hover:translate-x-1'
              />
            </Button>
            <Button
              variant='ghost'
              className='text-white hover:bg-white hover:text-blue-600'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <Minus size={24} /> : <Plus size={24} />}
              {isExpanded ? 'Hide Features' : 'Show Features'}
            </Button>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='list-inside list-disc space-y-2 text-white'
              >
                {features.map((feature: any, index: any) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
