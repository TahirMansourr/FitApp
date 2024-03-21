'use client'
import React, { useEffect, useState } from 'react'
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
import { Progress } from '@/lib/actions/ChallengeActions/progressforuser'
import { getSingleChallenges } from '@/lib/actions/ChallengeActions/getsingleChallenge'
import { PieChartForChallenge } from './pieChartForChallenge'
import BFC from '../profileChallengeComponent'

interface Challenge {
  _id: string; // Assuming _id is a string, you can adjust the type accordingly
  participants: any[]; // Define the type of participants array
  // Add other properties as needed
}

const ChallengeProgressComponent = ({challengeId , userId } : {challengeId : string , userId : any}) => {
  const [recivedChallenge , setrecivedChallenge] = useState<any >()
  const [myProgress , setmyProgress] = useState<any>()
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const variants = {
    open : {x : 100 , opacity : 1 },
    closed : { opacity : 0 ,x : 0 , y : 0 }
  }

  async function handleProgress(id : any){
    await Progress(id)
  }

  useEffect(() => {
    async function doatstart(param: any) {
      const data : any = await getSingleChallenges(param);
      const c: Challenge | null = data as Challenge | null;
      if (c) {
        console.log(c);
        setrecivedChallenge(c)
        const wantedProgress = c.participants.find(user => user.userId === userId)
        console.log(wantedProgress);
        setmyProgress(wantedProgress)
      }
    }
    doatstart(challengeId);
  }, [challengeId]);
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
        <CardTitle>{ recivedChallenge && recivedChallenge.duration != 'free' ?
       `${myProgress.progress}/${ recivedChallenge.duration} Days` : "Completed the Challenge?" }</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between h-48 w-48">
      {
          recivedChallenge && recivedChallenge.duration != 'free' ?
          <PieChartForChallenge
          daysLeft={myProgress.progress}
          daysofChallenge={recivedChallenge.duration}
          /> : <BFC/>
        }
      </CardContent>
      {recivedChallenge && recivedChallenge.duration !== 'free' ? 
      <CardFooter >
      <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
             <Button
              onClick={() => handleProgress(challengeId)}
              className='bg-gradient-to-br from-green-700 to-green-500  rounded-xl shadow-xl'
              >done for the day</Button>
            </div>
          </div>
      </CardFooter>
    : null  
    }
    </Card>
        </motion.div>
        </div>
  )
}

export default ChallengeProgressComponent