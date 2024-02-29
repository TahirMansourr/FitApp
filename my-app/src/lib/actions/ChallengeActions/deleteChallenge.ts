'use server'


import Challenge from "@/lib/models/ChallengeSchema"
import { connectToDB } from "@/lib/mongoose"

export async function DeleteChallenge( id : string) {
    try {
        connectToDB()

       await Challenge.deleteOne({_id : id})
       

    } catch (error : any) {
        throw new Error(`Error at DeleteChallenge.ts : ${error}`)
    }
}