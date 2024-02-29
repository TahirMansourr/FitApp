import Image from 'next/image'
import React from 'react'
import profile from '../../../../public/assets/profile.svg'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Roboto } from 'next/font/google'
import { fetchUserWithMongoId } from '@/lib/actions/userActions/findMongoUser'
import PostCard from '@/components/postComponents/postCard'
import TabsComponent from '@/components/tabsComponent'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/userActions/fetchUser'

const roboto = Roboto({
  weight : "500",
  subsets : ['greek']
})

const MyProfile = async ({params} : {params : {id : string}}) => {

  let shouldDelete;
  const passedUser = await fetchUserWithMongoId({userId : params.id})
  if(!passedUser) return null

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
  

  console.log(passedUser.username);
  console.log(shouldDelete);
  
  
    
  return (
    <div className=' pt-20' >
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
            <p className=' bg-slate-500 px-2 py-1 rounded-xl h-fit text-white shadow-xl w-fit'>@BodyBuilding</p>
            <p className=' bg-slate-500 px-2 py-1 rounded-xl h-fit text-white shadow-xl w-fit mx-auto'>@Coach</p>
        </div>
      
      <Select >
        <SelectTrigger className="w-fit border-none">
          <SelectValue placeholder="Follow" className={roboto.className} />
        </SelectTrigger>
         <SelectContent className={`${roboto.className} rounded-2xl border-none bg-slate-500 w-fit px-2 shadow-lg text-white text-center`}>
          <SelectItem value="Following">Following</SelectItem>
          <SelectItem value="Unfollow">Unfollow</SelectItem>
          {/* <SelectItem value="system">System</SelectItem> */}
        </SelectContent>
      </Select>
      <div className={`${roboto.className} flex gap-3`}>
      <div className=' flex flex-col items-center'>
          <p  className=' text-2xl' >{passedUser.follwers? passedUser.followers.length : 'x'}</p>
          <p>followers</p>
      </div>
      <div className=' flex flex-col items-center'>
          <p className=' text-2xl'>{passedUser.follwing? passedUser.following.length : 'x'}</p>
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