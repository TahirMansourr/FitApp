'use server'

import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "../userActions/fetchUser"
import Challenge from "@/lib/models/ChallengeSchema"

export async function Progress(challengeId : string) {
    try {
        connectToDB()
        const user = await currentUser()
        if(!user) throw new Error('user not found in progressofuser.ts')
        
        const mongoUser = await fetchUser({userId : user.id})
        if(!mongoUser) throw new Error('mongoUser not found in progressofuser.ts')
        
        
        const challenge = await Challenge.findById(challengeId);
        if (!challenge) {
        throw new Error(`something wrong with fetching the challenge in progressforuser.ts`)
        }
        
        const participant = challenge.participants.find((participant: any) => participant.userId.equals(mongoUser._id));
        if (!participant) {
            throw new Error('User is not a participant in this challenge');
        }

        // const participantIndex = challenge.participants.findIndex((participant : any) => participant.userId.equals(mongoUser._id));
        // if (participantIndex === -1) throw new Error('User is not a participant in this challenge');
        if (!participant.lastUpdate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1); // Subtract 1 day
            participant.lastUpdate = yesterday;
        }

        const today = new Date().toDateString(); 
        if (participant.lastUpdate && participant.lastUpdate.toDateString() === today) {
            return {message : 'Progress already updated today'};
        } 
        
        // Increment the progress of the participant
        participant.progress += 1;
        // Update the last update timestamp to today
        participant.lastUpdate = new Date();
        
        // Increment the progress of the participant
        // challenge.participants[participantIndex].progress += 1;
        
        // Update the challenge document in the database
        await Challenge.updateOne({ _id: challenge._id }, { participants: challenge.participants });
        
       return {message : 'successfully updated'}
    } catch (error:any) {
        throw new Error(`Error at progressforuser.tsx : ${error}`)
    }
}