import { useEffect } from 'react'
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react'
import AOS from 'aos'
import 'aos/dist/aos.css'

const SocialIcon = ({ Icon, href }: { Icon: React.ElementType; href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-blue-300 hover:text-white transition-colors duration-300"
  >
    <Icon className="h-5 w-5" />
  </a>
)

const TeamMember = ({
  image,
  name,
  role,
  bio,
  socials,
  animation = 'fade-up',
}: {
  image: string
  name: string
  role: string
  bio: string
  socials: {
    facebook?: string
    twitter?: string
    linkedin?: string
    github?: string
  }
  animation: string
}) => {
  return (
    <div
      className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
      data-aos={animation}
      data-aos-duration="1000"
    >
      <div className="relative overflow-hidden group">
        <img src={image} className="w-full h-64 object-cover object-center" alt={name} />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-4">
            {socials.facebook && <SocialIcon Icon={Facebook} href={socials.facebook} />}
            {socials.twitter && <SocialIcon Icon={Twitter} href={socials.twitter} />}
            {socials.linkedin && <SocialIcon Icon={Linkedin} href={socials.linkedin} />}
            {socials.github && <SocialIcon Icon={Github} href={socials.github} />}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
        <p className="text-blue-200 mb-4">{role}</p>
        <p className="text-gray-300 text-sm">{bio}</p>
      </div>
    </div>
  )
}

export const TeamSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Cloud Architect",
      image: "/images/team/sarah-johnson.jpg",
      bio: "Sarah is a certified AWS Solutions Architect with over 10 years of experience in designing scalable cloud infrastructures.",
      socials: {
        linkedin: "https://www.linkedin.com/in/sarahjohnson",
        twitter: "https://twitter.com/sarahjcloud",
        github: "https://github.com/sarahjohnson"
      },
      animation: "fade-up"
    },
    {
      name: "Michael Chen",
      role: "DevOps Engineer",
      image: "/images/team/michael-chen.jpg",
      bio: "Michael specializes in CI/CD pipelines and container orchestration, ensuring smooth deployments and optimal performance.",
      socials: {
        linkedin: "https://www.linkedin.com/in/michaelchen",
        github: "https://github.com/michaelchen"
      },
      animation: "fade-up"
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      image: "/images/team/emily-rodriguez.jpg",
      bio: "Emily leverages cloud-based machine learning platforms to derive actionable insights from complex datasets.",
      socials: {
        linkedin: "https://www.linkedin.com/in/emilyrodriguez",
        twitter: "https://twitter.com/emilyrdatascience"
      },
      animation: "fade-up"
    }
  ]

  return (
    <section className="bg-gradient-to-b from-blue-900 to-indigo-900 py-20 2xl:py-32">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Cloud Experts</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Our team of skilled professionals is dedicated to delivering cutting-edge cloud solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  )
}

