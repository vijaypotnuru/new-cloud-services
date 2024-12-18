// @ts-nocheck
import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { Input } from '@/components/ui/input'
import { User, Calendar, Target } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import {
  Loader2,
  Package,
  MapPin,
  IndianRupee,
  Droplet,
  RotateCcw,
  Image as ImageIcon,
  Plus,
  X,
} from 'lucide-react'
import { Button } from '@/components/custom/button'
import { createProject } from '@/http/api'
import { useMutation } from '@tanstack/react-query'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]

const milestoneSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
  images: z.array(z.any()).optional(),
})

const formSchema = z.object({
  projectName: z
    .string()
    .min(3, { message: 'Project name must be at least 3 characters long' })
    .refine((val) => val.trim().length > 0, {
      message: 'Project name cannot be empty',
    }),
  location: z
    .string()
    .min(3, { message: 'Location must be at least 3 characters long' })
    .refine((val) => val.trim().length > 0, {
      message: 'Location cannot be empty',
    }),
  budget: z.number().min(100, { message: 'Budget must be at least ₹100' }),
  material: z
    .string()
    .min(3, { message: 'Material must be at least 3 characters long' })
    .refine((val) => val.trim().length > 0, {
      message: 'Material cannot be empty',
    }),
  userId: z.string().min(1, { message: 'User ID is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  projectDescription: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .optional(),
  milestones: z.array(milestoneSchema),
})

type FormValues = z.infer<typeof formSchema>

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

const MilestoneCard = ({ milestone, index, onRemove }) => (
  <Card className='mb-4 bg-[#C19D68]'>
    <CardHeader>
      <CardTitle className='text-lg'>
        Milestone {index + 1}: {milestone.title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>
        <strong>Start Date:</strong> {milestone.startDate}
      </p>
      <p>
        <strong>End Date:</strong> {milestone.endDate}
      </p>
      {milestone.images && milestone.images.length > 0 && (
        <div className='mt-2 grid grid-cols-2 gap-2'>
          {milestone.images.map((image, imgIndex) => (
            <img
              key={imgIndex}
              src={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`Milestone ${index + 1} - Image ${imgIndex + 1}`}
              className='h-auto w-full rounded'
            />
          ))}
        </div>
      )}
    </CardContent>
    <CardFooter>
      <Button variant='destructive' onClick={onRemove}>
        Remove Milestone
      </Button>
    </CardFooter>
  </Card>
)

export default function ProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const [isAddingMilestone, setIsAddingMilestone] = useState(false)
  const [milestoneImages, setMilestoneImages] = useState<(File | string)[]>([])

  const mutate = useMutation({
    mutationFn: (data: any) => createProject(data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Project created successfully',
      })
      handleReset()
    },
    onError: (data: any) => {
      const errorMessage = data.response.data.message
      console.log('errorMessage', errorMessage)
      toast({
        title: `${errorMessage}`,
        description: 'Failed to create project',
        variant: 'destructive',
      })
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      milestones: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'milestones',
  })

  const uploadImageToFirebase = async (file: File): Promise<string> => {
    if (!file) {
      console.error('No file provided for upload')
      throw new Error('No file provided for upload')
    }

    const storageRef = ref(
      storage,
      `vibepattern-foam-projects/${file.name}-${Date.now()}`
    )
    const uploadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
          console.log('Upload is ' + progress + '% done')
        },
        (error) => {
          console.error('Upload failed:', error)
          reject(error)
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            console.log('File available at', downloadURL)
            resolve(downloadURL)
          } catch (error) {
            console.error('Failed to get download URL:', error)
            reject(error)
          }
        }
      )
    })
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setProgress(0)

    try {
      const milestoneImageUrls = await Promise.all(
        data.milestones.map(async (milestone) => {
          if (milestone.images && milestone.images.length > 0) {
            const uploadedUrls = await Promise.all(
              milestone.images.map(async (image) => {
                if (image instanceof File) {
                  return await uploadImageToFirebase(image)
                } else if (
                  typeof image === 'string' &&
                  image.startsWith('http')
                ) {
                  return image // Already a URL, no need to upload
                } else {
                  console.error('Invalid image:', image)
                  return null
                }
              })
            )
            return uploadedUrls.filter(Boolean) // Remove any null values
          }
          return []
        })
      )

      const formData = {
        ...data,
        milestones: data.milestones.map((milestone, index) => ({
          ...milestone,
          images: milestoneImageUrls[index],
        })),
      }

      console.log('Submitting form data:', formData)
      await mutate.mutateAsync(formData)
      toast({
        title: 'Success',
        description: 'Your foam project details have been saved.',
      })
      handleReset()
    } catch (error: any) {
      console.error('Form submission error:', error)
      toast({
        title: `${error.response.data.message}`,
        description: 'Failed to submit the form. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
      setProgress(0)
    }
  }

  const handleReset = () => {
    reset()
    setProgress(0)
    setMilestoneImages([])
  }

  const handleMilestoneImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || [])
    setMilestoneImages((prevImages) => [...prevImages, ...files])
  }

  const removeMilestoneImage = (index: number) => {
    setMilestoneImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  return (
    <Card className='mx-auto w-full max-w-2xl bg-[#e4dee2]'>
      <CardHeader>
        <CardTitle className='text-[#53278d]'>Foam Project Details</CardTitle>
        <CardDescription className='text-[#53278d]'>
          Enter the details for your new foam project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 text-[#53278d]'
        >
          <div className='grid grid-cols-2 gap-4'>
            <FoamField
              label='Project Name'
              error={errors.projectName?.message}
              icon={Package}
            >
              <Input
                {...register('projectName')}
                placeholder='Enter project name'
                className='w-full'
              />
            </FoamField>

            <FoamField
              label='Location'
              error={errors.location?.message}
              icon={MapPin}
            >
              <Input
                {...register('location')}
                placeholder='Enter location'
                className='w-full'
              />
            </FoamField>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <FoamField
              label='Budget'
              error={errors.budget?.message}
              icon={IndianRupee}
            >
              <Input
                type='number'
                {...register('budget', { valueAsNumber: true })}
                placeholder='Enter budget'
                className='w-full'
              />
            </FoamField>

            <FoamField
              label='Material'
              error={errors.material?.message}
              icon={Droplet}
            >
              <Input
                {...register('material')}
                placeholder='Enter material'
                className='w-full'
              />
            </FoamField>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <FoamField
              label='User ID'
              error={errors.userId?.message}
              icon={User}
            >
              <Input
                {...register('userId')}
                placeholder='Enter user ID'
                className='w-full'
              />
            </FoamField>

            <FoamField
              label='Password'
              error={errors.password?.message}
              icon={User}
            >
              <Input
                type='text'
                {...register('password')}
                placeholder='Enter password'
                className='w-full'
              />
            </FoamField>
          </div>

          <FoamField
            label='Project Description'
            error={errors.projectDescription?.message}
            icon={Package}
          >
            <Textarea
              {...register('projectDescription')}
              placeholder='Enter project description'
              className='w-full'
            />
          </FoamField>

          <div>
            <h3 className='mb-4 text-lg font-semibold'>Milestones</h3>
            {fields.map((field, index) => (
              <MilestoneCard
                key={field.id}
                milestone={field}
                index={index}
                onRemove={() => remove(index)}
              />
            ))}
            <Dialog
              open={isAddingMilestone}
              onOpenChange={setIsAddingMilestone}
            >
              <DialogTrigger asChild>
                <Button
                  type='button'
                  className='bg-[#53278d]'
                  onClick={() => setIsAddingMilestone(true)}
                >
                  <Plus className='mr-2 h-4 w-4' /> Add Milestone
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-[#e4dee2]'>
                <DialogHeader>
                  <DialogTitle>Add New Milestone</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    append({
                      title: e.target.title.value,
                      startDate: e.target.startDate.value,
                      endDate: e.target.endDate.value,
                      images: milestoneImages,
                    })
                    setIsAddingMilestone(false)
                    setMilestoneImages([])
                  }}
                >
                  <div className='space-y-4'>
                    <FoamField label='Title' icon={Target}>
                      <Input
                        name='title'
                        placeholder='Milestone title'
                        required
                      />
                    </FoamField>
                    <FoamField label='Start Date' icon={Calendar}>
                      <Input type='date' name='startDate' required />
                    </FoamField>
                    <FoamField label='End Date' icon={Calendar}>
                      <Input type='date' name='endDate' required />
                    </FoamField>
                    <FoamField label='Images' icon={ImageIcon}>
                      <Input
                        type='file'
                        accept={ACCEPTED_IMAGE_TYPES.join(',')}
                        name='images'
                        multiple
                        onChange={handleMilestoneImageUpload}
                      />
                    </FoamField>
                    {milestoneImages.length > 0 && (
                      <div className='mt-2 grid grid-cols-2 gap-2'>
                        {milestoneImages.map((image, index) => (
                          <div
                            key={index}
                            className='relative rounded-md border-2 border-gray-300'
                          >
                            <img
                              src={
                                image instanceof File
                                  ? URL.createObjectURL(image)
                                  : image
                              }
                              alt={`Preview ${index + 1}`}
                              className='h-auto w-[20%] rounded'
                            />
                            <Button
                              type='button'
                              variant='destructive'
                              size='icon'
                              className='absolute right-1 top-1'
                              onClick={() => removeMilestoneImage(index)}
                            >
                              <X className='h-4 w-4' />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      className='bg-[#53278d] text-[#e4dee2]'
                      type='submit'
                      onClick={(e) => e.stopPropagation()}
                    >
                      Add New Milestone
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {isSubmitting && (
            <div className='space-y-2'>
              <Progress value={progress} className='w-full' />
              <p className='text-center text-sm text-[#53278d]'>
                Submitting... {progress.toFixed(0)}%
              </p>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button
          className='bg-[#53278d] text-[#e4dee2]'
          type='button'
          variant='outline'
          onClick={handleReset}
          disabled={isSubmitting}
        >
          <RotateCcw className='mr-2 h-4 w-4' />
          Reset
        </Button>
        <Button
          className='bg-[#53278d]'
          loading={mutate.isPending}
          type='submit'
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting || !isValid}
        >
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}
