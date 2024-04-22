'use server'

import Challenge from "@/lib/models/ChallengeSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "../userActions/fetchUser"

export async function getAllChallenges(){
    await connectToDB()
   try {
    const user = await currentUser()

    if(!user){
        console.log('cannot find user');
        return {status : 'failed' , message : "Cannot find User"}
        
    }
    const userObjectId = await fetchUser({userId : user.id})
    const challenges = await Challenge.find().populate({ path : "createdBy" , model : User}).lean()
   
    return({
       challenges,
       userId : userObjectId._id// using the .lean() mehthod removes the maximum stack exceeded error
    })
   } catch (error: any) {
    throw new Error(`Error at findAllChallenges.ts : ${error.message}`)
   }
}