'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {motion} from 'framer-motion'
import { BiSolidError } from "react-icons/bi";
import heart from '../../../public/assets/heart.svg'
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
import LoadingComponent from '../LoadingComponent'
import { FcApproval } from 'react-icons/fc'
import Image from 'next/image';
import { PiShareFatLight } from 'react-icons/pi';

interface Challenge {
  _id: string; 
  participants: any[]; 
}

const ChallengeProgressComponent = ({challengeId , userId } : {challengeId : string , userId : any}) => {
  const [recivedChallenge , setrecivedChallenge] = useState<any >()
  const [myProgress , setmyProgress] = useState<any>()
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const [loading , setloading] = useState<boolean>(false)
  const [response , setResponse] = useState<string>()
  const variants = {
    open : {x : 100 , opacity : 1 },
    closed : { opacity : 0 ,x : 0 , y : 0 }
  }

  async function handleProgress(id : any){
    setloading(true)
    await Progress(id).then((res : {message : string}) => setResponse(res.message))
    setloading(false)
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
    <div className=' w-full'>
       <div className='flex justify-between items-center w-full'>
        <div>
       <Button 
         onClick={()=>setIsOpen(!isOpen)}
         className='bg-gradient-to-br from-green-700 to-green-500  rounded-xl shadow-xl'
         >
        {!isOpen ? 'Enter Progress' : 'Finished?'}
        </Button> 
        </div>
       {!isOpen?
        <div className=' flex gap-3'>
          <Image
              src = {heart}
              alt = 'like image'
              width = {24}
              height = {24}
          />
          <PiShareFatLight size={25} />
         </div>
        : null }
       </div>
        
        <motion.div
        animate = {isOpen ? 'open' : 'closed'}
        variants={variants}
        >
          {!response?
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
              >  { !loading ? "done for the day" :<LoadingComponent LoadingText='Calculating progress' />} </Button>

            </div>
          </div>
      </CardFooter>
    : null  
    }
           </Card>
            : <div className='mt-4'> {
              response === 'successfully updated' ? 
              <div className='flex gap-3 items-center'> 
              <FcApproval size={30}/> <div> {response} </div>
              </div>
              : response === 'Progress already updated today' ?
              <div className='flex gap-3 items-center'> 
              <BiSolidError size={30} color='red' /> <div> {response} </div>
              </div>
              : <div> {response} </div> } </div>   }
        </motion.div>
        </div>
  )
}

export default ChallengeProgressComponent