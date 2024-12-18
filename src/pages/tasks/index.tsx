// @ts-nocheck
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { tasks } from './data/tasks'
import { useQuery } from '@tanstack/react-query'
import { getProjects } from '@/http/api'
import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Tasks() {
  const { user } = useAuth()
  const navigate = useNavigate()
  console.log('user', user)
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])
  const {
    data: projectsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  })

  const projects = projectsResponse?.data.projects || []
  console.log('projectsd  ssasasa', projects)
  return (
    <Layout className='bg-[#F5ECF2]'>
      {/* ===== Top Heading ===== */}
      <Layout.Header className='bg-[#e4dee2]' sticky>
        <div className='ml-auto flex items-center space-x-4'>
          {/* <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight text-[#53278d]'>
              Projects
            </h2>
            <p className='text-[#53278d]'>Here&apos;s a list of your projects!</p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={projects} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
