'use server'

import Challenge from "@/lib/models/ChallengeSchema"
import { connectToDB } from "@/lib/mongoose"
import { fetchUser } from "../userActions/fetchUser"
import User from "@/lib/models/userSchema"
import { currentUser } from "@clerk/nextjs"

interface Props {
    
    name : string,
    body : string,
    description : string
}

export async function createChallenge ({ name  , body ,description} : Props){
  connectToDB()
  try {

    const user = await currentUser()
    if(!user){
        console.log('cannot find user');
        return null
        
    }
    const userObjectId = await fetchUser({userId : user.id})
    const newChallenge = await Challenge.create({
        createdBy : userObjectId._id,
        name,
        body,
       description
    })
    
    await newChallenge.save()
    await userObjectId.createdChallenges.push(newChallenge._id)
    await userObjectId.save()
    
  } catch (error : any) {
    throw new Error(`Error at creating Challenge in createChallenge.ts : ${error.message}`)
  }
}