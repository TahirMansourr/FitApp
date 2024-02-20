// import React from 'react'
// import UserProfile from '../userProfile/page'
// import { currentUser } from '@clerk/nextjs'
// import { fetchUser } from '@/lib/actions/userActions/fetchUser'

// const User = async () => {

//     const user = await currentUser()
//     if(!user) return console.log('no user found');
    
//     const mongoUser = await fetchUser({userId : user.id})
//     if(!mongoUser) return console.log('no mongo user found')

//     const us = JSON.stringify(mongoUser._id)
//   return (
// //    <UserProfile userId={us}/>
//   )
// }

// export default User