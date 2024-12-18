import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full max-w-md">
      <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        />
      </div>
    </div>
  )
}

