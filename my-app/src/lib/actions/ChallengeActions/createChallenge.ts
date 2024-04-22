'use server'

import Challenge from "@/lib/models/ChallengeSchema"
import { connectToDB } from "@/lib/mongoose"
import { fetchUser } from "../userActions/fetchUser"
import User from "@/lib/models/userSchema"
import { currentUser } from "@clerk/nextjs"

interface Props {    
    name : string,
    body : string,
    description : string,
    duration : number | string
}

export async function createChallenge ({name,body,description,duration} : Props){
  connectToDB()
  try {

    const user = await currentUser()

    if(!user){
        console.log('cannot find user');
        return {status : 'failed' , message : "Cannot find User"}
        
    }
    const userObjectId = await fetchUser({userId : user.id})

    const existingChallenge = await Challenge.findOne({ name });
        if (existingChallenge) {
            console.log('Challenge with the same name already exists');
            return { status: 'failed', message: "A challenge with the same name already exists" };
        }
    const existingChallenge2 = await Challenge.findOne({ body });
        if (existingChallenge2) {
            console.log('Challenge with the same name already exists');
            return { status: 'failed', message: "This Challenge already exists" };
        }


    const newChallenge = await Challenge.create({
        createdBy : userObjectId._id,
        name,
        body,
        description,
        duration
    })
    
    await newChallenge.save()
    await userObjectId.createdChallenges.push(newChallenge._id)
    await userObjectId.save()
    
    return {status : 'success' , message : 'Your challenge has been created successfully!'}
  } catch (error : any) {
    return {status : 'failed'  , message : error.message}
    // throw new Error(`Error at creating Challenge in createChallenge.ts : ${error.message}`)
  }
}