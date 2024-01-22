'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'

type Props = {
  dailyDietState : boolean ,
   setDailyDietState : Function
}

const Diet = ({dailyDietState , setDailyDietState} : Props) => {

  const [date , setDate] = useState(new Date())
  return (
    <div className=' bg-gray bg-opacity-10 p-3 rounded-xl shadow-md mt-3 h-fit flex flex-col items-center'>
      {/* <h2>{date.toDateString()}</h2> */}
      <h1>Enter your Meals and i'll make you remember</h1>
     <Button   
     className=' bg-gray rounded-xl mt-3 text-white hover:scale-105 hover:bg-gray shadow-md '
     onClick={()=> setDailyDietState(!dailyDietState)}
     >
       <p>what did you eat today?</p>
     </Button>
    </div>
    
  )
}

export default Diet