import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LoadingIndicator from './components/LoadingIndicator'

function App() {
  const [redirect, setRedirect] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      // Navigate to the dashboard if the user is logged in
      navigate('/dashboard')
    } else {
      // If no user is found, set a timer to redirect to the sign-in page
      const timer = setTimeout(() => {
        setRedirect(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [navigate])

  useEffect(() => {
    if (redirect) {
      navigate('/sign-in')
    }
  }, [redirect, navigate])

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-300 to-indigo-500'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src='/images/main-logo.png'
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