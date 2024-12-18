// @ts-nocheck
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { tasks } from './data/tasks'
import { useQuery } from '@tanstack/react-query'
import { getPaymentDetailsByUserId, getProjects } from '@/http/api'
import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Transactions() {
  const { user } = useAuth()
  const navigate = useNavigate()
  console.log('user', user)
  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user])
  const {
    data: transactionsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getPaymentDetailsByUserId(user?.user_id),
  })

  const transactions = transactionsResponse?.data.payments || []
  console.log('projectsd  ssasasa', transactions)
  return (
    <Layout className='bg-black'>
      {/* ===== Top Heading ===== */}
      <Layout.Header className='bg-[#C19D68]' sticky>
        <div className='ml-auto flex items-center space-x-4'>
          {/* <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight text-white'>
              Transactions
            </h2>
            <p className='text-muted'>Here&apos;s a list of your projects!</p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={transactions} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
