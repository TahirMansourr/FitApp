
import ProfileForm from "@/components/forms/profileForm"

import { getCurrentUser } from "@/lib/utils"
import { currentUser } from "@clerk/nextjs";

 async function OnBoarding (){

    const user = await currentUser()
    if(!user) return null

    const userData = {
        id : user?.id,
        username : user?.username,
        profilePicture : user?.imageUrl
    }

  return (
    <div className=" flex justify-center items-center align-middle pt-20 pb-2  ">
        <ProfileForm user = {userData as {id : string , username : string , profilePicture : string}} />
    </div>
  )
}

export default OnBoarding;