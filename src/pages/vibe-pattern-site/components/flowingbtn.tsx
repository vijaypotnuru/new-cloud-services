
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/custom/button'
import { motion } from 'framer-motion'

export default function FlowingBtn() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToHero = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/917893683143', '_blank')
  }

  return (
    <div className='fixed bottom-12 right-12 z-50 flex flex-col gap-4'>
      {isVisible && (
        <Button
          variant='outline'
          size='icon'
          className='rounded-full border-2 border-dotted border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground w-12 h-12'
          onClick={scrollToHero}
          aria-label='Scroll to top'
        >
          <ArrowUp className='h-5 w-5' />
        </Button>
      )}

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Button
          variant='outline'
          size='icon'
          className='rounded-full bg-transparent border-none w-14 h-14'
          onClick={openWhatsApp}
          aria-label='Chat on WhatsApp'
        >
          <img src='/images/whatsapp.png' alt='WhatsApp' className='h-full w-full' />
        </Button>
      </motion.div>
    </div>
  )
}

