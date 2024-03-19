'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import {motion} from 'framer-motion'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const ChallengeProgressComponent = () => {
  const [clicked , setClicked] = useState(false)
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const variants = {
    open : {x : 100 , opacity : 1 },
    closed : { opacity : 0 ,x : 0 , y : 0 }
  }
  return (
    <div>
       
         <Button 
         onClick={()=>setIsOpen(!isOpen)}
         className='bg-gradient-to-br from-green-700 to-green-500  rounded-xl shadow-xl'
         >
        {!isOpen ? 'Enter Progress' : 'Finished?'}
        </Button> 
        <motion.div
        animate = {isOpen ? 'open' : 'closed'}
        variants={variants}
        >
           <Card className={isOpen?`w-fit h-fit` : `w-0 h-0`}>
      <CardHeader>
        <CardTitle>My Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
             this is me
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
        </motion.div>
        </div>
  )
}

export default ChallengeProgressComponent