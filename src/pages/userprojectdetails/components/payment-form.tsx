// @ts-nocheck
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { IndianRupee } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import { useMutation } from '@tanstack/react-query'
import { makeOrder } from '@/http/api'
import { useToast } from '@/components/ui/use-toast'

const paymentSchema = z.object({
  amount: z.number().min(1, { message: 'Amount must be at least ₹1' }),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

const FoamField = ({
  label,
  error,
  children,
  icon: Icon,
}: {
  label: string
  error?: string
  children: React.ReactNode
  icon: React.ElementType
}) => (
  <div className='space-y-2'>
    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
      {label}
    </label>
    <div className='relative'>
      <div className='absolute left-2 top-2.5 text-muted-foreground'>
        <Icon size={20} />
      </div>
      <div className='pl-8'>{children}</div>
    </div>
    {error && <p className='text-sm text-destructive'>{error}</p>}
  </div>
)

export function PaymentForm({ projectDetails }: { projectDetails: any }) {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
  })
  const { user } = useAuth()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (data: any) => makeOrder(data),
    onSuccess: (successData: any) => {
      console.log('successData', successData);
      const redirectUrl = successData?.data?.data?.instrumentResponse?.redirectInfo?.url;
      console.log('redirectUrl', redirectUrl);
      window.location.href = redirectUrl; // Redirect the user
      toast({
        title: 'Payment successful',
        description: 'Redirecting to payment page...',
      });
    },
    onError: () => {
      toast({
        title: 'Payment failed',
        description: 'Payment failed',
      })
    },
  })

  const onSubmit = (data: PaymentFormValues) => {
    console.log('Payment submitted:', data)
    const transactionid = new Date().getTime().toString() + Math.random().toString(36).substring(2, 15)
    const paymentData = {
      id: user?.user_id,
      planname: 3,
      amount: data.amount,
      phone: '9876543210',
      email: 'testuser@gmail.com',
      transactionid: transactionid,
      muid: 'UID578947',
      url: 'https://vibepattern.com/',
    }
    console.log('paymentData', paymentData)
    mutation.mutate(paymentData)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='bg-[#53278d] text-[#e4dee2]' onClick={() => setIsOpen(true)}>Make Payment</Button>
      </DialogTrigger>
      <DialogContent className='bg-[#e4dee2] sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Make a Payment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <FoamField
            label='Amount'
            error={errors.amount?.message}
            icon={IndianRupee}
          >
            <Input
              type='number'
              {...register('amount', { valueAsNumber: true })}
              placeholder='Enter amount'
            />
          </FoamField>
          <Button type='submit' className='w-full bg-[#53278d] text-[#e4dee2]'>
            Submit Payment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
