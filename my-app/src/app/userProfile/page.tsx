import React from 'react'
import { UserButton } from "@clerk/nextjs";
import CardInputComponent from '@/components/ChallengeCard';
import ChallengesComponent from '@/components/cardComponent';
import DailyWorkOut from '@/components/dailyWorkOut';
import Diet from '@/components/diet';
import DailyWorkOutForm from '@/components/dailyWorkOutForm';
import Link from 'next/link';
import PersonalRecordsComponent from '@/components/personalRecordsComponent';
import WorkOutHistory from '@/components/workOutHistory';

const UserProfile = () => {
  return (
    <div className=' flex flex-col justify-center '>
      <div className=' mx-auto flex justify-between px-6 p-5 items-center shadow-xl rounded-2xl mt-3 hover:scale-110 transition ease-in-out duration-100  bg-gray
      dark:shadow-slate-500 dark:shadow-md'>  <h1>my awards and achievments</h1></div>
          <div className='flex justify-around items-center mt-10'>
            <div className=' flex flex-col gap-3'>
              <DailyWorkOut/>
              <Diet/>
              <div className=' bg-gray bg-opacity-10 p-3 rounded-lg shadow-md mt-3 h-fit'>
               <Link href = ''>want to see your training history??</Link> 
               <WorkOutHistory/>
              </div>
            {/* <DailyWorkOutForm/> */}
            </div>
          <div className='flex flex-col items-center gap-3 justify-center '>
         
          <PersonalRecordsComponent/>
          <ChallengesComponent />
          </div>
        </div>
    </div>
    
  )
}

export default UserProfile