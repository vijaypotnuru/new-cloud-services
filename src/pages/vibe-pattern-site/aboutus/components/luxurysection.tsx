import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, Cloud, Server, Database } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Button } from '@/components/custom/button'


export const LuxurySection = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <section className='bg-gradient-to-b from-blue-50 to-indigo-100'>
      <div className='container mx-auto py-20 px-4 sm:overflow-hidden lg:overflow-auto 2xl:py-32'>
        <div className='flex flex-col items-center justify-between gap-12 md:flex-row'>
          <div className='flex-1' data-aos='fade-right'>
            <img
              src='https://blog.emb.global/wp-content/uploads/2024/04/image-2-1024x574.png'
              alt='Cloud Infrastructure'
              className='h-full w-full rounded-lg shadow-xl'
            />
          </div>
          <div
            className='flex-1 space-y-6 font-sans md:ml-10'
            data-aos='fade-left'
          >
            <h5 className='text-lg font-semibold leading-6 text-blue-600'>
              CLOUD SERVICES EXPERTS
            </h5>
            <h1 className='text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl'>
              Transforming Businesses with Cloud Innovation
            </h1>
            <p className='text-lg leading-relaxed text-gray-700'>
              Cloud Services Hub stands as a pioneering force in enterprise cloud computing and digital transformation, specializing in comprehensive cloud hosting, storage, and advanced computing solutions.
            </p>
            <p className='text-lg leading-relaxed text-gray-700'>
              As a leading organization in cloud infrastructure, managed services, database management, and DevOps automation, we deliver scalable cloud architectures that drive business innovation. We emphasize technical excellence and enterprise-grade reliability in the IT sector.
            </p>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              <FeatureCard
                icon={<Cloud className="h-8 w-8 text-blue-500" />}
                title="Cloud Hosting"
                description="Scalable and secure hosting solutions for your applications"
              />
              <FeatureCard
                icon={<Server className="h-8 w-8 text-blue-500" />}
                title="Managed Services"
                description="24/7 monitoring and management of your cloud infrastructure"
              />
              <FeatureCard
                icon={<Database className="h-8 w-8 text-blue-500" />}
                title="Database Management"
                description="Optimized database solutions for high performance"
              />
              <FeatureCard
                icon={<Cloud className="h-8 w-8 text-blue-500" />}
                title="DevOps Automation"
                description="Streamline your development and deployment processes"
              />
            </div>
            <div className='rounded-lg bg-white p-6 shadow-md'>
              <p className='text-lg font-medium text-gray-800'>
                Headquarters: 157 Nelson Street, Nhill-3418, Victoria, Australia
              </p>
              <p className='mt-2 flex items-center text-lg text-gray-600'>
                <Phone className="mr-2 h-5 w-5 text-blue-500" />
                (+91) 0449738637
              </p>
              <p className='mt-2 flex items-center text-lg text-gray-600'>
                <Mail className="mr-2 h-5 w-5 text-blue-500" />
                contact@invtechnologies.com
              </p>
            </div>
            <Button size="lg" onClick={() => navigate('/services')}>
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const FeatureCard = ({ icon, title, description } : any) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-gray-600">{description}</p>
    </div>
  </div>
)

