'use server'

import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "../userActions/fetchUser"
import Challenge from "@/lib/models/ChallengeSchema"

export async function participateToChallenge(param : string) {
    try {
        connectToDB()
        const user = await currentUser()
        if(!user) throw new Error('cannot find user in clerk in participateToChallenge.ts')

        const mongoUser = await fetchUser({userId : user.id})
        if (!mongoUser) throw new Error('cannot find mongoUser in participateToChallenge.ts')
        // i should have the challenge id passed through the props 
        // i should push this challenge to the mongoUserChallenges field and pass the user to the participants in the challenges participant field
        console.log(param)

        const ChallengeIneed = await Challenge.findOne({ _id : param})
        console.log(ChallengeIneed)
        await ChallengeIneed.participants.push({userId :mongoUser._id , progress : 0})
        await ChallengeIneed.save()
        await mongoUser.challenges.push({
            theChallenge : param,
            participatedAt : new Date()
        })
        await mongoUser.save()
        console.log(mongoUser.challenges)
        console.log('you have successfully participated');
        

        return 'success'
    } catch (error: any) {
        return {error}
        throw new Error(`Error at participateToChallenge.ts : ${error}`)
    }
}