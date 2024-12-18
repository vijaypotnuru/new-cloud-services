// @ts-nocheck

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useMutation } from '@tanstack/react-query'

import { useToast } from '@/components/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { createUser } from '@/http/api'

const userSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  mobile: z
    .string()
    .min(10, { message: 'Mobile number is required' })
    .max(15, { message: 'Mobile number is too long' }),
})

type UserFormValues = z.infer<typeof userSchema>

type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
}

export default function UserManagement({ usersList }: any) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutateUserCreation = useMutation({
    mutationFn: (data: any) => createUser(data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'User created successfully',
      })
      
      reset()

      queryClient.invalidateQueries({ queryKey: ['userslist'] })
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create user',
        variant: 'destructive',
      })
    },
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 4

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      mobile: '',
    },
  })

  const {
    watch,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form

  const mobile = watch('mobile')
  console.log('mobile', mobile)

  const onSubmit = (data: UserFormValues) => {
    console.log('submitted data', data)
    const userData = {
      user_name: data.name,
      email: data.email,
      password: data.password,
      phone_number: data.mobile,
    }
    mutateUserCreation.mutate(userData)
  }

  const filteredUsers = usersList.filter(
    (user: any) =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  return (
    <Card className='mx-auto w-full max-w-4xl'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold'>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='mb-6 space-y-4'>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <FormField
                control={control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter name' {...field} />
                    </FormControl>
                    <FormMessage>{errors.name?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='mobile'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        type='tel'
                        placeholder='Enter mobile number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.mobile?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' className='w-full'>
              Add User
            </Button>
          </form>
        </Form>

        <div className='mb-4 flex items-center justify-between'>
          <div className='relative'>
            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder='Search users...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-8'
            />
          </div>
          <div className='text-sm text-muted-foreground'>
            Total Users:{' '}
            <span className='font-medium text-foreground'>
              {filteredUsers.length}
            </span>
          </div>
        </div>

        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((userItem: any) => (
                <TableRow key={userItem.user_id}>
                  <TableCell className='font-medium'>
                    {userItem.user_name}
                  </TableCell>
                  <TableCell>{userItem.email}</TableCell>
                  <TableCell>{userItem.phone_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='flex items-center justify-between space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className='mr-2 h-4 w-4' />
            Previous
          </Button>
          <div className='text-sm text-muted-foreground'>
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className='ml-2 h-4 w-4' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
