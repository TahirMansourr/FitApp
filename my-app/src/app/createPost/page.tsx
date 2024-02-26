import CreateFormPost from '@/components/forms/createPostForm'
import { fetchUser } from '@/lib/actions/userActions/fetchUser';
import { currentUser } from '@clerk/nextjs'
import React from 'react'

async function CreatePost () {

    const user = await currentUser()
    if(!user) return null;

    const userInfo = await fetchUser({userId : user.id})

  return (
    <div className=' p-10 pt-28'>
        <CreateFormPost 
        userId={userInfo._id}
        username = {userInfo.username}
        imageUrl={user.imageUrl}
        />
    </div>
  )
}

export default CreatePost