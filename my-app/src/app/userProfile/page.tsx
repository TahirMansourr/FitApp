'use client'
import React, { useState } from 'react'
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


const UserProfile = (userId : string) => {

  const [dailyWorkOutFormState , setDailyWorkOutFormState] = useState<boolean>(false)
  const [dailyDietState , setDailyDietState] = useState<boolean>(false)
  const [theUserId , setUserId] = useState<string>('')


  // for the motion library
  const [isOpen , setIsOpen] = useState<boolean>(false)
  const variants = {
    open : {x : 100  },
    closed : {x : 0 , y : 0}
  }
  
  const trophyArray = [transparent ,transparent ,transparent ]
  const [isBlurred , setIsBlurred] = useState<boolean>(false)

  return ( 
    <div className={isBlurred ?' backdrop-blur-2xl flex flex-col justify-center pt-20' : ' flex flex-col justify-center z-50 pt-20 '}>

      {/* <div className=' flex  '>

      {trophyArray.map ( (obj , index) => (

      <div className={ isBlurred ? ' blur-xl mx-auto flex justify-between items-center shadow-xl rounded-2xl mt-3 hover:scale-110 transition ease-in-out duration-100 bg-transparent dark:shadow-slate-500 dark:shadow-md' : 'mx-auto flex justify-between items-center shadow-xl rounded-2xl mt-3 hover:scale-110 transition ease-in-out duration-100 bg-transparent dark:shadow-slate-500 dark:shadow-md' }>
          <Image src={obj} alt = 'Our trophies' height={100} width={100} key={index} className='bg-none'/>
        </div>

      ))}


      </div> */}
     

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
                {/* <div className='  bg-gradient-to-br from-gray to-slate-400  p-3 rounded-xl shadow-lg mt-3 h-fit flex flex-col items-center'> */}
                <Link href = '/workoutHistory' >
                <Button 
                      className='  rounded-xl mt-3 text-white hover:scale-105 shadow-xl hover:bg-blue-950 h-[8rem] w-[12rem] bg-gradient-to-br from-[#161A30] to-[#232e6c] '
                 > 
                 See Training History
                 </Button>
     
                  </Link> 
                {/* <WorkOutHistory/> */}
                {/* </div> */}
                {/* <div className='  bg-gradient-to-br from-gray to-slate-400  p-3 rounded-xl shadow-lg mt-3 h-fit flex flex-col items-center'> */}
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
               {/* <Link href = '/workoutHistory' > */}
               <CreateChallenge>
               <Button 
                    className='rounded-xl mt-3 text-white hover:scale-105 shadow-xl hover:bg-blue-950 h-[8rem] w-[12rem] bg-gradient-to-br from-[#161A30] to-[#232e6c] '
                 > 
                 Create A new Challenge
                 </Button>
               </CreateChallenge>
                
                {/* </Link>  */}
                {/* <WorkOutHistory/> */}
                {/* </div> */}
           
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
            <div className='   bg-gradient-to-br from-gray to-slate-400 p-5 shadow-lg rounded-xl w-96  '>
              
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
                                       ' flex flex-col items-center gap-5 justify-center mt-3 '}>
          <PersonalRecordsComponent/>
          <ChallengesComponent  />
          </div>
        </div>
       
    </div>
    
  )
}

export default UserProfile