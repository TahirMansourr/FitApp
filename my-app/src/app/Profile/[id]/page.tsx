import Image from 'next/image'
import React from 'react'
import profile from '../../../../public/assets/profile.svg'

import { Roboto } from 'next/font/google'
import { fetchUserWithMongoId } from '@/lib/actions/userActions/findMongoUser'
import TabsComponent from '@/components/tabsComponent'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/userActions/fetchUser'
import FollowComponent from '@/components/followComponent'

const roboto = Roboto({
  weight : "500",
  subsets : ['greek']
})

const MyProfile = async ({params} : {params : {id : string}}) => {

  let shouldDelete;
  const passedUser = await fetchUserWithMongoId({userId : params.id})
  if(!passedUser) return null

  const requiredUsersFriends = {id : params.id , followers : passedUser.followers , following : passedUser.following}

  const user = await currentUser()
  if(!user) return null

  const mongoUser = await fetchUser({userId : user.id})
  if(!mongoUser) return null
  if (params.id == mongoUser._id){
    shouldDelete = true
  }
  else{
    shouldDelete = false
  }

  const currentUserFreinds = {id : mongoUser._id , followers : mongoUser.Followers , following : mongoUser.following}
  

  console.log(passedUser.username);
  console.log(shouldDelete);
  
  
    
  return (
    <div className=' pt-20 min-h-screen bg-white dark:bg-black dark:text-white' >
      <div className=' flex p-5 justify-around'>
        <div className=' flex gap-5'>
            <Image
            src = {passedUser.image ? passedUser.image : profile}
            alt = {'profile Picture'}
            width={100}
            height={100}
            className=' rounded-full'
          />
          <div>
            <p className={`${roboto.className} italic `}>{passedUser.username}</p>
            <p className=' italic max-w-52'>{passedUser.bio ? passedUser.bio : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, facilis '}</p>
          </div>
        </div>
     
      <div className=' flex items-center gap-3'>
        <div className=' flex flex-col gap-2'>
            <p className=' bg-slate-500 px-2 py-1 rounded-xl h-fit text-white shadow-xl w-fit'>@{passedUser.sport? passedUser.sport : 'BodyBuilding'}</p>
            <p className=' bg-slate-500 px-2 py-1 rounded-xl h-fit text-white shadow-xl w-fit mx-auto'>@{passedUser.position? passedUser.position : 'Coach'}</p>
        </div>
      
     <FollowComponent 
        requiredUsersFriends = {requiredUsersFriends}
        currentUserFriends = {currentUserFreinds}
     />
      <div className={`${roboto.className} flex gap-3`}>
      <div className=' flex flex-col items-center'>
          <p  className=' text-2xl' >{passedUser.followers? passedUser.followers.length : 'x'}</p>
          <p>followers</p>
      </div>
      <div className=' flex flex-col items-center'>
          <p className=' text-2xl'>{passedUser.following? passedUser.following.length : 'x'}</p>
          <p>following</p>
      </div>
        </div>
       </div> 
      </div>
      <div className=' w-[40rem] mx-auto h-1 bg-slate-500 rounded-full shadow-lg'></div>
    <TabsComponent 
      passedUser = {passedUser}
      shouldDelete = {shouldDelete}
    /> 
    </div>
  )
}

export default MyProfile