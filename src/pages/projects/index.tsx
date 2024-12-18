// @ts-nocheck
import { Layout } from '@/components/custom/layout'
  
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

import ProjectForm from './components/projects-foam'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Projects() {
  const { user } = useAuth()
  const navigate = useNavigate()
  console.log('user', user)
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])
  return (
    <Layout className='bg-[#F5ECF2]'>
      {/* ===== Top Heading ===== */}
      <Layout.Header className='bg-[#e4dee2]' sticky>
        <div className='ml-auto flex items-center space-x-4'>
          {/* <ThemeSwitch />  */}
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
          <h2 className='text-[#53278d] text-2xl font-bold tracking-tight'>Projects Creation</h2>
            <p className='text-[#53278d]'>
              Create your Projects here!
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <ProjectForm />
        </div>
      </Layout.Body>
    </Layout>
  )
}
