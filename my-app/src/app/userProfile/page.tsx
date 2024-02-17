'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";
import CardInputComponent from '@/components/forms/ChallengeCard';
import ChallengesComponent from '@/components/cardComponent';
import DailyWorkOut from '@/components/dailyWorkOut';
import Diet from '@/components/diet';
import DailyWorkOutForm from '@/components/forms/dailyWorkOutForm';
import Link from 'next/link';
import PersonalRecordsComponent from '@/components/personalRecordsComponent';
import WorkOutHistory from '@/components/workOutHistory';
import { IoIosArrowBack } from "react-icons/io";
import RenderBarChart from '@/components/barChart';
import DailyDiet from '@/components/forms/DailyDiet';
import transparent from '../.././../public/transparent.jpg'
import ProgressChart from '@/components/progressChart';
import Example from '@/components/progressChart';
import {motion} from 'framer-motion'
import { Scale } from 'lucide-react';

const UserProfile = () => {

  const [dailyWorkOutFormState , setDailyWorkOutFormState] = useState<boolean>(false)
  const [dailyDietState , setDailyDietState] = useState<boolean>(false)


  // for the motion library
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const variants = {
    open : {x : 50 , y : -60 , scale : 1.2},
    closed : {x : 0 , y : 0}
  }
  
  const trophyArray = [transparent ,transparent ,transparent  ]
  const [isBlurred , setIsBlurred] = useState<boolean>(false)

  return ( 
    <div className={isBlurred ?' backdrop-blur-2xl flex flex-col justify-center ' : ' flex flex-col justify-center z-50 h-1/2'}>

      <div className=' flex  '>

      {trophyArray.map ( (obj , index) => (

      <div className={ isBlurred ? ' blur-xl mx-auto flex justify-between items-center shadow-xl rounded-2xl mt-3 hover:scale-110 transition ease-in-out duration-100 bg-transparent dark:shadow-slate-500 dark:shadow-md' : 'mx-auto flex justify-between items-center shadow-xl rounded-2xl mt-3 hover:scale-110 transition ease-in-out duration-100 bg-transparent dark:shadow-slate-500 dark:shadow-md' }>
          <Image src={obj} alt = 'Our trophies' height={100} width={100} key={index} className='bg-none'/>
        </div>

      ))}


      </div>
     

          <div className='flex justify-around items-center mt-5'>
            <motion.div
               animate = {isOpen ? 'open' : 'closed'}
               variants={variants}
            >
           { !dailyWorkOutFormState && !dailyDietState ? <div className=' flex flex-col gap-3'>
              <DailyWorkOut 
              dailyWorkoutFormState = {dailyWorkOutFormState}
              setDailyWorkoutFormState = {setDailyWorkOutFormState}
              setIsBlurred={setIsBlurred}
              setIsOpen = {setIsOpen}
              />
              <Diet 
              dailyDietState = {dailyDietState}
              setDailyDietState={setDailyDietState}
              setIsBlurred={setIsBlurred}
              setIsOpen = {setIsOpen}
              />
                <div className=' bg-[#B6BBC4] bg-opacity-10 p-3  shadow-md mt-3 h-fit rounded-xl flex flex-col items-center'>
                <Link href = '/workoutHistory' >want to see your training history??</Link> 
                <WorkOutHistory/>
                </div>
           
            </div> : dailyWorkOutFormState ?
            <div className=' bg-gray bg-opacity-10 p-5 shadow-lg rounded-xl w-96 max-h-fit   '>

              {dailyWorkOutFormState ? 
              <div 
              className=' flex justify-start'
              onClick={() => {setDailyWorkOutFormState(false) 
                              setIsBlurred(false)    
                              setIsOpen(false)      
              }}
              >
                <IoIosArrowBack />
                </div> 
              : null
              }
               <DailyWorkOutForm
               dailyWorkoutFormState = {dailyWorkOutFormState}
               setDailyWorkoutFormState = {setDailyWorkOutFormState}
               />
            </div>
            : dailyDietState ? 
            <div className='  bg-[#B6BBC4] bg-opacity-10 p-5 shadow-lg rounded-xl w-96 max-h-fit '>
              
              {dailyDietState ? 
              <div 
              className=' flex justify-start'
              onClick={() => {
                setDailyDietState(false)
                setIsBlurred(false)    
                setIsOpen(false) 
              }}
              >
                <IoIosArrowBack />
                </div> 
              : null
              }
               <DailyDiet setIsBlurred = {setIsBlurred}/>
              </div>
         
             : null }
              </motion.div>
          <div className={ isBlurred ? ' blur-xl flex flex-col items-center gap-5 justify-center'  : 
                                       ' flex flex-col items-center gap-5 justify-center'}>
          <PersonalRecordsComponent/>
          <ChallengesComponent  />
          {/* <RenderBarChart/> */}
          
          </div>
        </div>
       
    </div>
    
  )
}

export default UserProfile