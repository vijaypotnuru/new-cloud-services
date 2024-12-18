
// @ts-nocheck
// import { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// interface HeroProps {
//   title?: string
//   backgroundImage?: string
// }

// export const Hero: React.FC<HeroProps> = ({ 
//   title = "Welcome to Our Website", 
//   backgroundImage = "/placeholder.svg?height=550&width=1920" 
// }) => {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false)

//   useEffect(() => {
//     const video = videoRef.current
//     if (video) {
//       video.preload = 'auto'
//       video.muted = true

//       const handleLoadedData = () => {
//         setIsVideoLoaded(true)
//         if (video.duration) {
//           video.currentTime = 0
//         }
//       }

//       video.addEventListener('loadeddata', handleLoadedData)
//       video.load()

//       return () => {
//         video.removeEventListener('loadeddata', handleLoadedData)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     if (isVideoLoaded && videoRef.current && containerRef.current) {
//       const video = videoRef.current
//       const duration = video.duration

//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: 'top top',
//         end: 'bottom bottom',
//         scrub: true,
//         onUpdate: (self) => {
//           video.currentTime = duration * self.progress
//         },
//       })
//     }
//   }, [isVideoLoaded])

//   return (
//     <section ref={containerRef} className="relative h-[300vh] bg-black">
//       <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden">
//         <video
//           ref={videoRef}
//           className="w-full h-full object-cover"
//           src="/video.mp4"
//           playsInline
//           muted
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//           <div className="text-center max-w-4xl px-4">
//             <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
//               {title}
//             </h1>
//             <p className="text-xl sm:text-2xl text-gray-300 mb-10">
//               Transform your space into a masterpiece with our innovative interior design solutions
//             </p>
//           </div>
//         </div>
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 max-w-3xl">
//           <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
//             <div
//               className="h-full bg-blue-500 transition-all duration-100 ease-out"
//               style={{
//                 width: `${videoRef.current ? (videoRef.current.currentTime / videoRef.current.duration) * 100 : 0}%`,
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }




import { Link } from 'react-router-dom'

export const Hero = ({
  title,
  backgroundImage,
}: {
  title: any
  backgroundImage?: any
}) => {
  return (
    <section
      className='relative grid h-[550px] items-center justify-center bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='absolute inset-0' />{' '}
      {/* Overlay for better text visibility */}
      <div className='relative z-10 mt-10 text-center'>
        <h1 className='font-serif text-3xl uppercase leading-10 text-white md:text-4xl lg:text-5xl lg:leading-[60px]  2xl:text-6xl 2xl:leading-[70px]'>
          {title}
        </h1>
        {/* quote */}
        <div className='text-white'>
          <p className='text-lg'>
            "Interior design is not just about creating beautiful spaces; it’s about designing
            environments that inspire and elevate the human experience."
          </p>
        </div>


        {/* <div className='flex items-center justify-center'>
          <Link
            to='/'
            className='flex items-center font-serif text-base leading-10 text-[#C19D68] lg:text-2xl 2xl:leading-[70px]'
          >
            Home
            <span className='mx-2 text-white'>/</span>
          </Link>
          <Link
            to='/about'
            className='font-serif text-base capitalize leading-10 text-white lg:text-2xl 2xl:leading-[70px]'
          >
            About Us
          </Link>
        </div> */}
      </div>
    </section>
  )
}
