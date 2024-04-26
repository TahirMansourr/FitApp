import React from 'react'
import { motion } from "framer-motion"
import LoadingComponent from '@/components/LoadingComponent'


const loading = () => {
  return (
    <div className=' flex items-center justify-center mt-52 scale-110'>
      <LoadingComponent LoadingText= 'Please bare with me, this might take a few seconds'/>
    </div>
  )
}

export default loading