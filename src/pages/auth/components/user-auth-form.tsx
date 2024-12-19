import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  user_id: z.string().min(1, { message: 'User ID is required' }).max(20, { message: 'User ID must not exceed 20 characters' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

// Predefined user credentials (in a real app, this would be handled securely on the server)
const VALID_USERS = [
  { user_id: 'admin123', password: 'admin123!', role: 'admin' },
  { user_id: 'user123', password: '123@Apple', role: 'user' },
]

export function UserAuthForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const validUser = VALID_USERS.find(
        (user) => user.user_id === data.user_id && user.password === data.password
      )

      if (validUser) {
        // Successful login
        localStorage.setItem('user', JSON.stringify({ user_id: data.user_id, role: validUser.role }))
        toast({
          title: 'Login Successful',
          description: 'Welcome to your cloud services dashboard!',
          variant: 'default',
        })
        navigate('/dashboard')
      } else {
        // Failed login
        toast({
          title: 'Login Failed',
          description: 'Invalid User ID or password. Please try again.',
          variant: 'destructive',
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 mt-6'>
        <FormField
          control={form.control}
          name='user_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input placeholder='Enter your User ID' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='••••••••' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type='submit' 
          className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            'Log in'
          )}
        </Button>
      </form>
    </Form>
  )
}

