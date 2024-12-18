// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { XCircle, RefreshCcw, ArrowLeft } from 'lucide-react'

const PaymentFailedPage: React.FC = () => {
  const [countdown, setCountdown] = useState(30)
  const navigate = useNavigate()

  useEffect(() => {
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
      clearInterval(countdownInterval)
    }
  }, [navigate])

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4'>
      <div className='w-full max-w-md rounded-lg bg-white shadow-xl'>
        <div className='p-6 text-center'>
          <div className='mx-auto mb-4 h-20 w-20 text-red-600'>
            <XCircle className='h-full w-full' />
          </div>
          <h2 className='text-2xl font-bold text-red-600'>Payment Failed</h2>
        </div>
        <div className='px-6 pb-6 text-center'>
          <p className='mb-4 text-gray-600'>
            We're sorry, but your payment could not be processed at this time.
          </p>
          <div className='rounded-lg bg-gray-50 p-4'>
            <p className='mb-2 text-sm text-gray-500'>Error Details</p>
            <p className='font-semibold'>Error Code: PAY_ERR_001</p>
            <p className='font-semibold'>
              Message: Transaction declined by issuer
            </p>
          </div>
          <p className='mt-4 text-gray-600'>
            Redirecting to checkout in{' '}
            <span className='font-bold text-red-600'>{countdown}</span>{' '}
            seconds...
          </p>
        </div>
        <div className='flex flex-col space-y-2 px-6 pb-6'>
          <button
            className='w-full rounded bg-red-600 px-4 py-2 font-bold text-white transition duration-200 hover:bg-red-700'
            onClick={() => navigate('/user')}
          >
            Try Again
            <RefreshCcw className='ml-2 inline-block h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailedPage
