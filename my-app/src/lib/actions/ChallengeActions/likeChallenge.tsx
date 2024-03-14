'use server'

import Challenge from "@/lib/models/ChallengeSchema"
import { connectToDB } from "@/lib/mongoose"

export async function LikeChallenge(challengeId : string) {
    try {
        connectToDB()
        let theChallenge = await Challenge.findByIdAndUpdate(challengeId , { $inc: { likes: 1 } })
        await theChallenge.save()
        console.log(theChallenge)
        
    } catch (error: any) {
        throw new Error(`Error at likeChallenge : ${error}`)
    }
}