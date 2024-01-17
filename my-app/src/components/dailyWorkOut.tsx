'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import DailyWorkOutForm from './dailyWorkOutForm'

const DailyWorkOut = () => {

  const [date , setDate] = useState(new Date())
  return (
    <div className=' bg-gray bg-opacity-10 p-3 rounded-lg shadow-md mt-3 h-fit'>
      {/* <h2>{date.toDateString()}</h2> */}
      <h1>Enter your daily work out</h1>
      <p>what did you do today?</p>
      <Button 
      className=''
     // onClick={() => console.log('i was clicked')}
      >Click me to enter workout</Button>
     
    </div>
    
  )
}

export default DailyWorkOut