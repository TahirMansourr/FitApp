'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";
import CardInputComponent from '@/components/ChallengeCard';
import ChallengesComponent from '@/components/cardComponent';
import DailyWorkOut from '@/components/dailyWorkOut';
import Diet from '@/components/diet';
import DailyWorkOutForm from '@/components/dailyWorkOutForm';
import Link from 'next/link';
import PersonalRecordsComponent from '@/components/personalRecordsComponent';
import WorkOutHistory from '@/components/workOutHistory';
import { IoIosArrowBack } from "react-icons/io";
import RenderBarChart from '@/components/barChart';
import DailyDiet from '@/components/DailyDiet';
import transparent from '../.././../public/transparent.jpg'
import ProgressChart from '@/components/progressChart';
import Example from '@/components/progressChart';

const UserProfile = () => {

  const [dailyWorkOutFormState , setDailyWorkOutFormState] = useState<boolean>(false)
  const [dailyDietState , setDailyDietState] = useState<boolean>(false)
  
  const trophyArray = [transparent ,transparent ,transparent  ]
  const [isBlurred , setIsBlurred] = useState<boolean>(false)

  return (
    <div className={isBlurred ?'blur-xl flex flex-col justify-center ' : 'flex flex-col justify-center'}>

      <div className=' flex'>

      {trophyArray.map ( (obj , index) => (

      <div className=' mx-auto flex justify-between
      items-center shadow-xl rounded-2xl mt-3
      hover:scale-110 transition ease-in-out duration-100
      bg-opacity-5 dark:shadow-slate-500 dark:shadow-md'>
          <Image src={obj} alt = 'Our trophies' height={100} width={100} key={index} className='bg-none'/>
        </div>

      ))}


      </div>
     

          <div className='flex justify-around items-center mt-10'>
           { !dailyWorkOutFormState && !dailyDietState ? <div className=' flex flex-col gap-3'>
              <DailyWorkOut 
              dailyWorkoutFormState = {dailyWorkOutFormState}
              setDailyWorkoutFormState = {setDailyWorkOutFormState}
              />
              <Diet 
              dailyDietState = {dailyDietState}
             setDailyDietState={setDailyDietState}/>
                <div className=' bg-gray bg-opacity-10 p-3  shadow-md mt-3 h-fit rounded-xl flex flex-col items-center'>
                <Link href = '/workoutHistory' >want to see your training history??</Link> 
                <WorkOutHistory/>
                </div>
           
            </div> : dailyWorkOutFormState ?
            <div className=' bg-gray bg-opacity-10 p-5 shadow-lg rounded-xl w-96 max-h-fit '>

              {dailyWorkOutFormState ? 
              <div 
              className=' flex justify-start'
              onClick={() => setDailyWorkOutFormState(false)}
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
            <div className=' bg-gray bg-opacity-10 p-5 shadow-lg rounded-xl w-96 max-h-fit '>
              
              {dailyDietState ? 
              <div 
              className=' flex justify-start'
              onClick={() => setDailyDietState(false)}
              >
                <IoIosArrowBack />
                </div> 
              : null
              }
               <DailyDiet setIsBlurred = {setIsBlurred}/>
              </div>
         
             : null }

          <div className='flex flex-col items-center gap-5 justify-center '>
         
          <PersonalRecordsComponent/>
          <ChallengesComponent />
          {/* <RenderBarChart/> */}
          
          </div>
        </div>
       
    </div>
    
  )
}

export default UserProfile