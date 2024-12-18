import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className='w-64 h-2 bg-red-500 rounded-full overflow-hidden'>
      <motion.div
        className='h-full bg-gradient-gold'
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

export default ProgressBar

