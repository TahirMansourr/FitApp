'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import DailyWorkOutForm from './forms/dailyWorkOutForm'
import { connectToDB } from '@/lib/mongoose'
import { connectToDatabase } from '@/lib/MongoConnection/services'
// import express from 'express'
type props = {
  dailyWorkoutFormState : boolean,
  setIsBlurred :Function,
  setDailyWorkoutFormState : Function,
  setIsOpen : Function
}
const DailyWorkOut = ({dailyWorkoutFormState , setDailyWorkoutFormState , setIsBlurred , setIsOpen} : props) => {
  
  
  return (
    
      <Button 
      className=' bg-[#164863] rounded-xl mt-3 text-white hover:scale-105 shadow-xl hover:bg-blue-950 h-[8rem] w-[12rem] bg-gradient-to-br from-[#161A30] to-[#232e6c] '
        onClick={() => {setDailyWorkoutFormState(!dailyWorkoutFormState) 
                        setIsBlurred(true)
                        setIsOpen(true)                 
        }}
      > {`Enter today's workout`}</Button>
     
   
    
  )
}

export default DailyWorkOut