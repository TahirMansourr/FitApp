import React from 'react'
import { UserButton } from "@clerk/nextjs";
import CardInputComponent from '@/components/ChallengeCard';
import CardComponent from '@/components/cardComponent';
import DailyWorkOut from '@/components/dailyWorkOut';
import Diet from '@/components/diet';

const UserProfile = () => {
  return (
    <div className=' flex flex-col justify-center '>
      <div className=' mx-auto flex justify-between px-6 p-5 items-center shadow-xl rounded-2xl mt-3 hover:scale-110 transition ease-in-out duration-100  bg-gray
    dark:shadow-slate-500 dark:shadow-md'>  <h1>my awards and achievments</h1></div>
     
      <div className='flex justify-around items-center'>
      <CardComponent></CardComponent> 
      <DailyWorkOut/>
      <Diet/>
      </div>
    </div>
    
  )
}

export default UserProfile