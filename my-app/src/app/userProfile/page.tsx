'use client'
import React, { useEffect, useState } from 'react'
import ChallengesComponent from '@/components/cardComponent';
import DailyWorkOut from '@/components/dailyWorkOut';
import Diet from '@/components/diet';
import DailyWorkOutForm from '@/components/forms/dailyWorkOutForm';
import Link from 'next/link';
import PersonalRecordsComponent from '@/components/personalRecordsComponent';
import { IoIosArrowBack } from "react-icons/io";
import DailyDiet from '@/components/forms/DailyDiet';
import transparent from '../.././../public/transparent.jpg'
import {motion} from 'framer-motion'
import { Button } from '@/components/ui/button';
import CreateChallenge from '@/components/challengesComponents/createChallenge';
import CalorieTracker from '@/components/calorieTracker';
import { getcurrentUser } from '@/lib/actions/userActions/getcurrentUser';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'


const UserProfile = (userId : string) => {

  const [dailyWorkOutFormState , setDailyWorkOutFormState] = useState<boolean>(false)
  const [dailyDietState , setDailyDietState] = useState<boolean>(false)
  const [theUserId , setUserId] = useState<string>('')
  const router = useRouter()

  // for the motion library
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const variants = {
    open : {x : 100  },
    closed : {x : 0 , y : 0}
  }
  
  const [isBlurred , setIsBlurred] = useState<boolean>(false)

  useEffect(()=>{
    async function getonBoarding(){
      await getcurrentUser().then((res : any) =>{
        if(res.onBoarding === "false"){
          console.log(res)
           router.push('/onBoarding')
        }
      })
    }
    getonBoarding()
  } ,[])

  return ( 
    <div className={isBlurred ?' backdrop-blur-2xl flex flex-col justify-center pt-20  bg-white dark:bg-black dark:text-white min-h-screen' : 'min-h-screen bg-white dark:bg-black dark:text-white flex flex-col justify-center z-50 pt-20 scale-110 '}>

          <div className='flex justify-around items-center mt-5'>
          <div className='flex flex-col -mt-3'>
            <h1 className='font-bold '>Activities</h1>
            <motion.div
               animate = {isOpen ? 'open' : 'closed'}
               variants={variants}
            >
                          
           { !dailyWorkOutFormState && !dailyDietState ? <div className=' grid grid-cols-2 gap-4'>
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
                <Link href = '/workoutHistory' >
                  <Button 
                        className='  rounded-xl mt-3 text-white hover:scale-105 shadow-xl hover:bg-blue-950 h-[8rem] w-[12rem] bg-gradient-to-br from-[#161A30] to-[#232e6c] '
                  > 
                  See Training History
                  </Button>     
                </Link> 
                <Link href = '/mychallenges' >
                <Button 
                    className='  rounded-xl mt-3 text-white hover:scale-105 shadow-xl hover:bg-blue-950 h-[8rem] w-[12rem] bg-gradient-to-br from-[#161A30] to-[#232e6c] '
                 
                 > 
                 See My challenges
                 </Button>
                </Link> 
                <Link href = '/mealshistory' >
                <Button 
                    className='  rounded-xl mt-3 text-white hover:scale-105 shadow-xl hover:bg-blue-950 h-[8rem] w-[12rem] bg-gradient-to-br from-[#161A30] to-[#232e6c] '
                 
                 > 
                 See My Meals History
                 </Button>
                </Link> 
               <CreateChallenge>
               <Button 
                    className='rounded-xl mt-3 text-white hover:scale-105 shadow-xl hover:bg-blue-950 h-[8rem] w-[12rem] bg-gradient-to-br from-[#161A30] to-[#232e6c] '
                 > 
                 Create A new Challenge
                 </Button>
               </CreateChallenge>
              
            </div>
             : dailyWorkOutFormState ?
            <div className=' text-white bg-gradient-to-br from-gray to-slate-400  p-3 rounded-xl shadow-lg mt-3 h-fit flex flex-col items-center'>

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
            <div className='   bg-gradient-to-br from-gray to-slate-400 p-5 shadow-lg rounded-xl w-96 text-white '>
              
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
              </div>
          <div className={ isBlurred ? ' blur-xl flex flex-col items-center gap-5 justify-center '  : 
                                       ' flex flex-col items-center gap-5 justify-center mt-8 '}>
           <CalorieTracker/>
          <ChallengesComponent  />
          </div>
        </div>
       
    </div>
    
  )
}

export default UserProfile;