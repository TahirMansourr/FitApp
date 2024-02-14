'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import DailyWorkOutForm from './forms/dailyWorkOutForm'
import { connectToDB } from '@/lib/mongoose'
import { connectToDatabase } from '@/lib/MongoConnection/services'
// import express from 'express'
type props = {
  dailyWorkoutFormState : boolean,
  setDailyWorkoutFormState : Function
}
const DailyWorkOut = ({dailyWorkoutFormState , setDailyWorkoutFormState} : props) => {
  // const app = express()
  // app.use(express.json())
  
  const [date , setDate] = useState(new Date())
  return (
    <div className=' bg-gray bg-opacity-10 p-3 rounded-xl shadow-md mt-3 h-fit flex flex-col items-center'>
      {/* <h2>{date.toDateString()}</h2> */}
      <h1 className=' text-center'>what work out did you do today?</h1>
      <Button 
      className=' bg-[#164863] rounded-xl mt-3 text-white hover:scale-105 hover:bg-gray shadow-md '
     onClick={() => {setDailyWorkoutFormState(!dailyWorkoutFormState) 
                     connectToDB()                 
    }}
      > Enter today's workout</Button>
     
    </div>
    
  )
}

export default DailyWorkOut