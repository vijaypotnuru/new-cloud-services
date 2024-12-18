
// @ts-nocheck
import { Layout } from '@/components/custom/layout'

import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

import { useQuery } from '@tanstack/react-query'
import { getProjectById, getProjects } from '@/http/api'
import ProjectDetailView from './components/projectdetailview'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'

export default function ProjectDetails() {
  const { user } = useAuth()
  console.log('user', user)

  const navigate = useNavigate()
  console.log('user', user)
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])
  const {
    data: projectDetailsResponse,
    isLoading: isProjectDetailsLoading,
    error: projectDetailsError,
  } = useQuery({
    queryKey: ['projectDetails'],
    queryFn: () => getProjectById(user?.project_id),
  })

  const projectDetails = projectDetailsResponse?.data.project || []
  console.log('projectDetails', projectDetails)
  return (
    <Layout className='bg-[#F5ECF2]'>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky className='bg-[#e4dee2]'>
        <div className='ml-auto flex items-center space-x-4'>
          {/* <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight text-[#53278d]'>
              Your Project
            </h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <ProjectDetailView projectDetails={projectDetails} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
