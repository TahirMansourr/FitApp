'use server'

import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "../userActions/fetchUser"
import Challenge from "@/lib/models/ChallengeSchema"

export async function GetMyChallenges() {
    try {
        const user = await currentUser()
        if(!user) throw new Error('user not found in getmyChallenges.ts')

        const mongoUser = await fetchUser({userId : user.id})
        if(!mongoUser) throw new Error('mongoUser not found in getmyChallenges.ts')

        const populatedUser = await mongoUser.populate({
            path : "challenges",
            model : Challenge    
        })

        return populatedUser.challenges
    } catch (error: any) {
        throw new Error(`error at getmychallenges.ts : ${error}`)
    }
}