'use server'

import Challenge from "@/lib/models/ChallengeSchema"
import Goal from "@/lib/models/GoalsSchema"
import Post from "@/lib/models/PostSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"

export async function fetchUserWithMongoId( { userId } : { userId : string}){
    connectToDB()
    try {
        
     return await  User.findOne({ _id : userId}).populate({
        path : 'Posts' ,
        model : Post
     })
     .populate({
        path : 'createdChallenges',
        model :Challenge
     })
     .populate({
        path : 'completedChallenges',
        model :Challenge
     })
     .populate({
        path : 'goals',
        model : Goal
     })

    } catch (error : any) {
        throw new Error(`Error fetching user at fetchUser.ts : ${error.message}`)
    }
}