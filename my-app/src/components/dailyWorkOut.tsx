'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import DailyWorkOutForm from './dailyWorkOutForm'

type props = {
  dailyWorkoutFormState : boolean,
  setDailyWorkoutFormState : Function
}
const DailyWorkOut = ({dailyWorkoutFormState , setDailyWorkoutFormState} : props) => {

  const [date , setDate] = useState(new Date())
  return (
    <div className=' bg-gray bg-opacity-10 p-3 rounded-xl shadow-md mt-3 h-fit flex flex-col items-center'>
      {/* <h2>{date.toDateString()}</h2> */}
      <h1 className=' text-center'>what work out did you do today?</h1>
      <Button 
      className=' bg-gray rounded-xl mt-3 text-white hover:scale-105 hover:bg-gray shadow-md '
     onClick={() => setDailyWorkoutFormState(!dailyWorkoutFormState) }
      > Enter today's workout</Button>
     
    </div>
    
  )
}

export default DailyWorkOut