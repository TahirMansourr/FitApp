'use server'

import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "../userActions/fetchUser"
import Challenge from "@/lib/models/ChallengeSchema"
import User from "@/lib/models/userSchema"

export async function GetMyCreatedChallenges() {
    try {
        const user = await currentUser()
        if(!user) throw new Error('user not found in getmyChallenges.ts')

        const mongoUser = await fetchUser({userId : user.id})
        if(!mongoUser) throw new Error('mongoUser not found in getmyChallenges.ts')

        const populatedUser = await mongoUser.populate({
            path : "createdChallenges",
            model : Challenge ,
            // populate : {
            //     path : 'createdBy',
            //     model : User
            // }   
        })

        await populatedUser.toObject()

        console.log(populatedUser.createdChallenges);
        

        

         return populatedUser.createdChallenges
    } catch (error: any) {
        throw new Error(`error at getmycreatedchallenges.ts : ${error}`)
    }
}