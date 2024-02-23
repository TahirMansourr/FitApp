'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'

type Props = {
  dailyDietState : boolean ,
  setDailyDietState : Function,
  setIsBlurred : Function,
  setIsOpen : Function
}

const Diet = ({dailyDietState , setDailyDietState , setIsBlurred , setIsOpen} : Props) => {

  const [date , setDate] = useState(new Date())
  return (
    
     <Button   
     className=' bg-[#164863] rounded-xl mt-3 text-white hover:scale-105shadow-xl hover:bg-blue-950 h-[8rem] w-[12rem] bg-gradient-to-br from-[#161A30] to-[#232e6c] '
     onClick={
      ()=> {setDailyDietState(!dailyDietState)
            setIsOpen(true)
            setIsBlurred(true)
      }
    
    }
     >
       <p>what did you eat today?</p>
     </Button>
    
    
  )
}

export default Diet