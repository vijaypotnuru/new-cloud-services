import { useEffect } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'keen-slider/keen-slider.min.css'
import 'aos/dist/aos.css'
import { Button } from '@/components/custom/button'

const blogPosts = [
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZXP4zpkTJx-H818YXTqikbzWs_OG4JxfGBw&s',
    date: 'May 15, 2023',
    category: 'Cloud Migration',
    title:
      'Streamlining Your Journey to the Cloud: Best Practices for Seamless Migration',
    excerpt:
      'Discover key strategies to ensure a smooth transition to cloud infrastructure while minimizing downtime and maximizing efficiency.',
    animation: 'fade-up',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf1OMu6J5YTObN2sXpNFBBJdhiItfK-yh41A&s',
    date: 'June 2, 2023',
    category: 'Serverless',
    title:
      'Embracing Serverless Architecture: Scaling Your Applications with Ease',
    excerpt:
      'Learn how serverless computing can revolutionize your development process and reduce operational overhead.',
    animation: 'fade-down',
  },
  {
    image:
      'https://assets.aboutamazon.com/dims4/default/8b6a960/2147483647/strip/true/crop/2548x1434+1+0/resize/2640x1486!/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F47%2F92%2F20cd4a824100b41ddc40f377b103%2Fhero-001-dallin-tasha-fidel-aws-employees-full-length-final-color-mix-v2-mp4-mp4-00-03-46-14-still023-copy-2-2.JPG',
    date: 'June 20, 2023',
    category: 'AI & ML',
    title: 'Harnessing the Power of AI and ML in the Cloud',
    excerpt:
      'Explore how cloud-based AI and machine learning services can drive innovation and unlock new possibilities for your business.',
    animation: 'fade-up',
  },
  {
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMNiCbyKHExMpDKuB1JdMgLpKdUL9z3oJsig&s',
    date: 'July 5, 2023',
    category: 'Security',
    title:
      'Fortifying Your Cloud: Advanced Security Measures for the Modern Enterprise',
    excerpt:
      'Dive into cutting-edge security practices to protect your cloud infrastructure from evolving cyber threats.',
    animation: 'fade-up',
  },
]

const BlogPost = ({ post }: { post: (typeof blogPosts)[number] }) => (
  <div
    className='group overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl'
    data-aos={post.animation}
    data-aos-duration='1000'
  >
    <div className='relative aspect-video overflow-hidden'>
      <img
        src={post.image}
        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
        alt={post.title}
      />
    </div>
    <div className='p-6'>
      <div className='mb-4 flex items-center space-x-4 text-sm text-gray-600'>
        <time dateTime={post.date}>{post.date}</time>
        <span className='rounded-full bg-blue-100 px-3 py-1 text-blue-800'>
          {post.category}
        </span>
      </div>
      <Link to={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}>
        <h2 className='mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 hover:text-blue-600'>
          {post.title}
        </h2>
      </Link>
      <p className='mb-4 text-gray-600'>{post.excerpt}</p>
      <Link
        to={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}
        className='inline-flex items-center text-blue-600 transition-colors duration-300 hover:text-blue-800'
      >
        Read More <ArrowRight className='ml-2 h-4 w-4' />
      </Link>
    </div>
  </div>
)

export const BlogSection = () => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 20,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 2, spacing: 20 },
      },
      '(max-width: 768px)': {
        slides: { perView: 1, spacing: 20 },
      },
    },
  })

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <section className='bg-gradient-to-b from-blue-50 to-indigo-100 py-20 lg:py-32'>
      <div className='container mx-auto px-4'>
        <div
          className='mb-12 text-center'
          data-aos='fade-up'
          data-aos-duration='1000'
        >
          <h2 className='mb-4 text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl'>
            Latest Insights from Our Cloud Experts
          </h2>
          <p className='mx-auto max-w-2xl text-xl text-gray-600'>
            Stay informed about the latest trends, best practices, and
            innovations in cloud technology to keep your business at the
            forefront of digital transformation.
          </p>
        </div>

        <div className='relative'>
          <div ref={sliderRef} className='keen-slider'>
            {blogPosts.map((post, index) => (
              <div key={index} className='keen-slider__slide'>
                <BlogPost post={post} />
              </div>
            ))}
          </div>
          <button
            onClick={() => instanceRef.current?.prev()}
            className='absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all hover:bg-blue-100'
            aria-label='Previous slide'
          >
            <ArrowLeft className='h-6 w-6 text-blue-600' />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className='absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all hover:bg-blue-100'
            aria-label='Next slide'
          >
            <ArrowRight className='h-6 w-6 text-blue-600' />
          </button>
        </div>

        <div className='mt-12 text-center'>
          <Button asChild size='lg'>
            <Link to='/blog'>View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
