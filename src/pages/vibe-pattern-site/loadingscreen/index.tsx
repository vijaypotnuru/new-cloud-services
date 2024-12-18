import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from './components/LoadingIndicator'

function App() {
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (redirect) {
      navigate('/home')
    }
  }, [redirect, navigate])

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-black'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src='/images/main-logo-ani.gif'
          width={501}
          height={60}
          alt='Company Logo'
          className='mb-8'
        />
      </motion.div>
      <LoadingIndicator />
    </div>
  )
}

export default App
