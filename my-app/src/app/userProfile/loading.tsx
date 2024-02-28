import React from 'react'
import { MotionConfig } from 'framer-motion'
import { motion } from "framer-motion"

const Loading = () => {
  const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)"
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 1)"
    }
  }
  return (
    <div className=' flex justify-center items-center'>
    kia
    </div>
  )
}

export default Loading