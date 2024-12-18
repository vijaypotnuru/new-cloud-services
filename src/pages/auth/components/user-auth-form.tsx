// @ts-nocheck
import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'

import { useAuth } from '@/hooks/use-auth'
import { loginUser } from '@/http/api'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  user_id: z.string().min(1, { message: 'Please enter your user ID' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { setUser } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.data.result)
      toast({
        title: 'User Login successfully',
        variant: 'default',
      })

      console.log('data.data.result.user_role', data.data.result)
      if (data.data.result.user_role === 'Admin') {
        navigate('/main/projects')
        // window.location.reload()
      } else {
        navigate('/user')
        // window.location.reload()
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response.data.error || 'Failed to login.'
      toast({
        title: `${errorMessage}`,
        variant: 'destructive',
      })
      console.log('login failed', error)
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    mutation.mutate(data)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='user_id'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter your user ID' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    {/* <Link
                        to='/forgot-password'
                        className='text-sm font-medium text-muted-foreground hover:opacity-75'
                      >
                        Forgot password?
                      </Link> */}
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={mutation.isPending}>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
