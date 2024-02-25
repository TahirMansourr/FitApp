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

const roboto = Roboto({
  weight : "500",
  subsets : ['greek']
})

const MyProfile = async ({params} : {params : {id : string}}) => {

  const passedUser = await fetchUserWithMongoId({userId : params.id})
  if(!passedUser) return null

  console.log(passedUser.username);
  
    
  return (
    <div >
      <div className=' flex p-5 justify-around'>
        <div className=' flex gap-5'>
            <Image
            src = {passedUser.image}
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
     
      <div className=' flex items-center'>
      <p className=' bg-slate-500 px-2 py-1 rounded-xl h-fit text-white shadow-xl'>@Coach</p>
      <Select>
        <SelectTrigger className="w-fit border-none">
          <SelectValue placeholder="Follow" />
        </SelectTrigger>
        <SelectContent className=' rounded-2xl border-none bg-slate-500 w-fit px-2 shadow-lg text-white text-center'>
          <SelectItem value="Following">Following</SelectItem>
          <SelectItem value="Unfollow">Unfollow</SelectItem>
          {/* <SelectItem value="system">System</SelectItem> */}
        </SelectContent>
      </Select>
      <div className={`${roboto.className} flex gap-3`}>
      <div className=' flex flex-col items-center'>
          <p  className=' text-2xl' >0</p>
          <p>followers</p>
      </div>
      <div className=' flex flex-col items-center'>
          <p className=' text-2xl'>0</p>
          <p>following</p>
      </div>
        </div>
       </div> 
      </div>
     
     <div className=' w-[40rem] mx-auto h-1 bg-slate-500 rounded-full shadow-lg'>

     </div>
     <div className=' flex gap-5 justify-center mt-3'>
     <div className=' flex flex-col items-center'>
          <p  className=' text-2xl' >0</p>
          <p>Posts</p>
      </div>
      <div className=' flex flex-col items-center'>
          <p  className=' text-2xl'>0</p>
          <p>Challenges Created</p>
      </div>
     </div>
     
    </div>
  )
}

export default MyProfile