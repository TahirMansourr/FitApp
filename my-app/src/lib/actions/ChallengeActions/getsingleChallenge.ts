'use server'

import Challenge from "@/lib/models/ChallengeSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"

export async function getSingleChallenges(id:any){
    await connectToDB()
   try {
    console.log('i am here tahir');
    return(
        Challenge.findById(id).lean()
        // using the .lean() mehthod removes the maximum stack exceeded error
        
    )
   } catch (error: any) {
    throw new Error(`Error at findAllChallenges.ts : ${error.message}`)
   }
}