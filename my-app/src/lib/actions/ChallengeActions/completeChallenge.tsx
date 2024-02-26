'use server'

import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "../userActions/fetchUser";

export async function completeChallenge(id :  any) {
 try {
    connectToDB()
    const user = await currentUser()
    if(!user){
        console.log('cannot find user');
        return null
    }
    const userObjectId = await fetchUser({userId : user.id})

    await userObjectId.completedChallenges.push(id)
    await userObjectId.save()

 } catch (error: any) {
    throw new Error(`error at completeChallenge.tsx : ${error}`)
 }   
}