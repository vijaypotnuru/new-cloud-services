import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Confetti from './components/confetti'

const PaymentSuccessPage: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const navigate = useNavigate()

  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(true), 500)

    const countdownInterval = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(countdownInterval)
          navigate('/user')
        }
        return prevCount - 1
      })
    }, 1000)

    return () => {
      clearTimeout(confettiTimer)
      clearInterval(countdownInterval)
    }
  }, [navigate])

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4'>
      {showConfetti && <Confetti />}
      <div className='w-full max-w-md rounded-lg bg-white shadow-xl'>
        <div className='p-6 text-center'>
          <div className='mx-auto mb-4 h-20 w-20 text-green-600'>
            <CheckCircle className='h-full w-full' />
          </div>
          <h2 className='text-2xl font-bold text-green-600'>
            Payment Successful!
          </h2>
        </div>
        <div className='px-6 pb-6 text-center'>
          <p className='mb-4 text-gray-600'>
            Thank you for your purchase. Your transaction has been completed
            successfully.
          </p>

          <p className='mt-4 text-gray-600'>
            Redirecting to transactions page in{' '}
            <span className='font-bold text-green-600'>{countdown}</span>{' '}
            seconds...
          </p>
        </div>
        <div className='flex flex-col space-y-2 px-6 pb-6'>
          <button
            className='w-full rounded bg-green-600 px-4 py-2 font-bold text-white transition duration-200 hover:bg-green-700'
            onClick={() => navigate('/user')}
          >
            View Transactions
            <ArrowRight className='ml-2 inline-block h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
