'use client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Roboto } from "next/font/google"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Follow } from "@/lib/actions/userActions/followAndUnfollow"

  const roboto = Roboto({
    weight : "500",
    subsets : ['greek']
  })

  interface Props{
        requiredUsersFriends : any,
        currentUserFriends : any
  }

const FollowComponent = ({requiredUsersFriends , currentUserFriends} : Props) => {

    const [following ,setFollowing] = useState<boolean>()
    
    useEffect(()=>{
       if(currentUserFriends.following.includes(requiredUsersFriends.id)){
       setFollowing(true)
     }else{
        setFollowing(false)
     }
        } , [])

        async function handleFollow(){
            await Follow({following :currentUserFriends.id , follower : requiredUsersFriends.id})
        }

  return (
    <div>
         {following === true ?
         <Select >
            <SelectTrigger className="w-fit border-none">
            <SelectValue placeholder="Following" className={roboto.className} />
            </SelectTrigger>
            <SelectContent className={`${roboto.className} rounded-2xl border-none bg-slate-500 w-fit px-2 shadow-lg text-white text-center`}>
            <SelectItem value="Unfollow"> Unfollow</SelectItem>
            </SelectContent>
         </Select> 
         :
         <Button onClick={()=>handleFollow()}>Follow</Button>}
    </div>
  )
}

export default FollowComponent