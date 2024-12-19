import { Card } from '@/components/ui/card'

import { Cloud } from 'lucide-react'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn2() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4'>
      <div className='w-full max-w-md'>
        <div className='mb-8 text-center'>
          <img
            src='/images/main-logo.png'
            className='mx-auto h-12 w-12 text-white'
          />
          <h1 className='mt-4 text-3xl font-bold text-white'>Cloud Services</h1>
        </div>
        <Card className='rounded-lg bg-white p-8 shadow-2xl'>
          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-gray-800'>
              Welcome Back
            </h2>
            <p className='text-sm text-gray-600'>
              Log in to access your cloud services dashboard
            </p>
          </div>
          <UserAuthForm />
        </Card>
      </div>
    </div>
  )
}
