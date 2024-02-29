'use server'

import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "../userActions/fetchUser";
import mongoose, { ObjectId } from "mongoose";


export async function completeChallenge({challengeId} : {challengeId : ObjectId}) {
 try {
    connectToDB()
    const user = await currentUser()
    if(!user){
        console.log('cannot find user');
        return null
    }
    const userObjectId = await fetchUser({userId : user.id})
    console.log(challengeId);
    
  
    await userObjectId.completedChallenges.push( challengeId)
    await userObjectId.save()

 } catch (error: any) {
    throw new Error(`error at completeChallenge.tsx : ${error}`)
 }   
}