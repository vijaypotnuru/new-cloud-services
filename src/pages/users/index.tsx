// @ts-nocheck
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

import { useQuery } from '@tanstack/react-query'
import UserManagement from './components/user-management'
import { getAllUsers } from '@/http/api'

export default function Users() {


  const {
    data: usersResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userslist'],
    queryFn: () => getAllUsers(),
  })
  const users = usersResponse?.data.users || []
  console.log("users", users)
  
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>

          {/* <ThemeSwitch /> */}
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Users</h2>
            <p className='text-muted-foreground'>Manage users</p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <UserManagement usersList={users} />
        </div>
      </Layout.Body>
    </Layout>
  )
}

const mockUsersList = [
  {
    id: 1,
    user_name: 'John Doe',
    email: 'john.doe@example.com',
    user_role: 'data entry',
    status: 'Active',
  },
  {
    id: 2,
    user_name: 'Jane Smith',
    email: 'jane.smith@example.com',
    user_role: 'admin',
    status: 'Inactive',
  },
  {
    id: 3,
    user_name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    user_role: 'data entry',
    status: 'Active',
  },
  {
    id: 4,
    user_name: 'Bob Brown',
    email: 'bob.brown@example.com',
    user_role: 'admin',
    status: 'Inactive',
  },
];
