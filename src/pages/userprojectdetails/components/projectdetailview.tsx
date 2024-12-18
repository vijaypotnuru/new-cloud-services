// @ts-nocheck
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Package,
  MapPin,
  IndianRupee,
  Calendar,
  Circle,
  User,
  Target,
  Image as ImageIcon,
  X,
  Edit,
} from 'lucide-react'
import { Button } from '@/components/custom/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useToast } from '@/components/ui/use-toast'
import { addMilestone, updateProject } from '@/http/api'
import { PaymentForm } from './payment-form'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]

const projectSchema = z.object({
  projectName: z
    .string()
    .min(3, { message: 'Project name must be at least 3 characters long' }),
  location: z
    .string()
    .min(3, { message: 'Location must be at least 3 characters long' }),
  budget: z.number().min(100, { message: 'Budget must be at least ₹100' }),
  material: z
    .string()
    .min(3, { message: 'Material must be at least 3 characters long' }),
  projectDescription: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .optional(),
})

const milestoneSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  startDate: z.string().min(1, { message: 'Start date is required' }),
  endDate: z.string().min(1, { message: 'End date is required' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
  images: z.array(z.any()).optional(),
})

type ProjectFormValues = z.infer<typeof projectSchema>
type MilestoneFormValues = z.infer<typeof milestoneSchema>

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

const MilestoneModal = ({
  milestone,
  isOpen,
  setIsOpen,
}: {
  milestone: any
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}) => (
  <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogContent className='sm:max-w-[425px] bg-[#e4dee2]'>
      <DialogHeader>
        <DialogTitle>{milestone.milestone_name}</DialogTitle>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Calendar className='h-4 w-4' />
          <div className='col-span-3'>
            {milestone.milestone_start_date} to {milestone.milestone_end_date}
          </div>
        </div>
        <div>{milestone.milestone_description}</div>
        {milestone.milestoneImages && milestone.milestoneImages.length > 0 && (
          <div className='grid grid-cols-2 gap-2'>
            {milestone.milestoneImages.map((image: any) => (
              <img
                key={image.milestone_image_id}
                src={image.img_url}
                alt={`Milestone image ${image.milestone_image_id}`}
                className='h-auto w-full rounded-md'
              />
            ))}
          </div>
        )}
      </div>
    </DialogContent>
  </Dialog>
)

export default function ProjectDetailView({
  projectDetails,
}: {
  projectDetails: any
}) {
  const [selectedMilestone, setSelectedMilestone] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditingProject, setIsEditingProject] = useState(false)
  const [isAddingMilestone, setIsAddingMilestone] = useState(false)
  const [milestoneImages, setMilestoneImages] = useState<(File | string)[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const {
    register: registerProject,
    handleSubmit: handleSubmitProject,
    formState: { errors: projectErrors },
    reset: resetProjectForm,
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: '',
      location: '',
      budget: 0,
      material: '',
      projectDescription: '',
    },
  })

  useEffect(() => {
    if (projectDetails) {
      resetProjectForm({
        projectName: projectDetails.project_name || '',
        location: projectDetails.location || '',
        budget: Number(projectDetails.budget) || 0,
        material: projectDetails.material || '',
        projectDescription: projectDetails.project_description || '',
      })
    }
  }, [projectDetails, resetProjectForm])

  const {
    register: registerMilestone,
    handleSubmit: handleSubmitMilestone,
    formState: { errors: milestoneErrors },
    reset: resetMilestoneForm,
  } = useForm<MilestoneFormValues>({
    resolver: zodResolver(milestoneSchema),
  })

  const updateProjectMutation = useMutation({
    mutationFn: (data: any) => updateProject(projectDetails.project_id, data),
    onSuccess: () => {
      toast({ title: 'Success', description: 'Project updated successfully' })
      queryClient.invalidateQueries({ queryKey: ['projectDetails'] })
      setIsEditingProject(false)
    },

    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update project',
        variant: 'destructive',
      })
    },
  })

  const addMilestoneMutation = useMutation({
    mutationFn: (data: any) => addMilestone(projectDetails.project_id, data),
    onSuccess: () => {
      toast({ title: 'Success', description: 'Milestone added successfully' })
      queryClient.invalidateQueries({ queryKey: ['projectDetails'] })
      setIsAddingMilestone(false)
      resetMilestoneForm()
      setMilestoneImages([])
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to add milestone',
        variant: 'destructive',
      })
    },
  })

  const handleMilestoneClick = (milestone: any) => {
    setSelectedMilestone(milestone)
    setIsModalOpen(true)
  }

  const onSubmitProjectEdit = (data: any) => {
    console.log('project data', data)

    const updatedData = {
      project_name: data.projectName,
      location: data.location,
      budget: data.budget,
      material: data.material,
      project_description: data.projectDescription,
    }
    updateProjectMutation.mutate(updatedData)
  }

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

  const onSubmitNewMilestone = async (data: MilestoneFormValues) => {
    setIsSubmitting(true)
    setProgress(0)

    try {
      const uploadedImageUrls = await Promise.all(
        milestoneImages.map(async (image) => {
          if (image instanceof File) {
            return await uploadImageToFirebase(image)
          } else if (typeof image === 'string' && image.startsWith('http')) {
            return image // Already a URL, no need to upload
          } else {
            console.error('Invalid image:', image)
            return null
          }
        })
      )

      const milestoneData = {
        milestone_name: data.title,
        milestone_start_date: data.startDate,
        milestone_end_date: data.endDate,
        milestone_description: data.description,
        images: uploadedImageUrls.filter(Boolean),
      }
      console.log('milestone data', milestoneData)
      await addMilestoneMutation.mutateAsync(milestoneData)
    } catch (error) {
      console.error('Milestone submission error:', error)
      toast({
        title: 'Error',
        description: 'Failed to add milestone. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
      setProgress(0)
    }
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

  if (!projectDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className='container mx-auto p-4'>
      <Card className='mb-8 bg-[#e4dee2]'>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {projectDetails.project_name}
          </CardTitle>
          <CardDescription className='text-[#53278d]'>
            Project ID: {projectDetails.project_id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='flex items-center'>
              <MapPin className='mr-2' />
              <span>{projectDetails.location}</span>
            </div>
            <div className='flex items-center'>
              <IndianRupee className='mr-2' />
              <span>Budget: ₹{projectDetails.budget}</span>
            </div>
            <div className='flex items-center'>
              <Package className='mr-2' />
              <span>Material: {projectDetails.material}</span>
            </div>
            <div className='flex items-center'>
              <User className='mr-2' />
              <span>User ID: {projectDetails.user_id}</span>
            </div>
          </div>
          <p className='mt-4'>{projectDetails.project_description}</p>
        </CardContent>
        <CardFooter>
       <PaymentForm projectDetails={projectDetails}/>
        </CardFooter>
      </Card>

      <Card className='bg-[#e4dee2]'>
        <CardHeader>
          <CardTitle>Project Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[400px] w-full rounded-md border p-4'>
            <div className='relative'>
              {projectDetails.milestones?.map(
                (milestone: any, index: number) => (
                  <div key={milestone.milestone_id} className='mb-8 flex'>
                    <div className='mr-4 flex flex-col items-center'>
                      <div className='rounded-full bg-[#53278d] p-2'>
                        <Circle className='h-6 w-6 text-[#e4dee2]' />
                      </div>
                      {index < projectDetails.milestones.length - 1 && (
                        <div className='my-2 h-full w-px bg-[#53278d]'></div>
                      )}
                    </div>
                    <div className='flex-grow'>
                      <Button
                        variant='link'
                        className='h-auto p-0 text-left font-semibold'
                        onClick={() => handleMilestoneClick(milestone)}
                      >
                        {milestone.milestone_name}
                      </Button>
                      <p className='text-sm text-[#53278d]'>
                        {milestone.milestone_start_date} to{' '}
                        {milestone.milestone_end_date}
                      </p>
                      <p className='mt-1 text-sm text-[#53278d]'>
                        {milestone.milestone_description}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          {/* <Dialog open={isAddingMilestone} onOpenChange={setIsAddingMilestone}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsAddingMilestone(true)}>
                Add New Milestonce
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-[#C19D68]'>
              <DialogHeader>
                <DialogTitle>Add New Milestone</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmitMilestone(onSubmitNewMilestone)}
                className='space-y-4'
              >
                <FoamField
                  label='Title'
                  error={milestoneErrors.title?.message}
                  icon={Target}
                >
                  <Input {...registerMilestone('title')} />
                </FoamField>
                <FoamField
                  label='Start Date'
                  error={milestoneErrors.startDate?.message}
                  icon={Calendar}
                >
                  <Input type='date' {...registerMilestone('startDate')} />
                </FoamField>
                <FoamField
                  label='End Date'
                  error={milestoneErrors.endDate?.message}
                  icon={Calendar}
                >
                  <Input type='date' {...registerMilestone('endDate')} />
                </FoamField>
                <FoamField
                  label='Description'
                  error={milestoneErrors.description?.message}
                  icon={Package}
                >
                  <Textarea {...registerMilestone('description')} />
                </FoamField>
                <FoamField label='Images' icon={ImageIcon}>
                  <Input
                    type='file'
                    accept={ACCEPTED_IMAGE_TYPES.join(',')}
                    multiple
                    onChange={handleMilestoneImageUpload}
                  />
                </FoamField>
                {milestoneImages.length > 0 && (
                  <div className='mt-2 grid grid-cols-2 gap-2'>
                    {milestoneImages.map((image, index) => (
                      <div key={index} className='relative'>
                        <img
                          src={
                            image instanceof File
                              ? URL.createObjectURL(image)
                              : image
                          }
                          alt={`Preview ${index + 1}`}
                          className='h-auto w-[15%] rounded'
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
                <Button type='submit' loading={isSubmitting}>
                  Add Milestone
                </Button>
              </form>
              {isSubmitting && (
                <div className='space-y-2'>
                  <Progress value={progress} className='w-full' />
                  <p className='text-center text-sm text-muted-foreground'>
                    Uploading... {progress.toFixed(0)}%
                  </p>
                </div>
              )}
            </DialogContent>
          </Dialog> */}
        </CardFooter>
      </Card>

      {selectedMilestone && (
        <MilestoneModal
          milestone={selectedMilestone}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
    </div>
  )
}
