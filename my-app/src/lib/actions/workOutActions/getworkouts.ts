'use server'

import Diet from "@/lib/models/DietSchema"
import WorkOut from "@/lib/models/WorkoutSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs"
import { populate } from "dotenv"

export async function getworkout() {
    connectToDB
    try {
        const user = await currentUser()
        if(!user) throw new Error(`cannot find user at getworkout.ts`)
         // here i can retun the diet also populated and then in the return i can return the diet and the workout. that would be splendid
        const workout = await User.findOne({id : user.id}).populate({
            path : 'workouts',
            model : WorkOut
        }).populate({
            path : 'diet',
            model : Diet
        }).lean()
        if(!workout) throw new Error(`Error at getworkouts.tsx at getting  mongoUser`)
        console.log(workout)
        if (!Array.isArray(workout)) { 
        
        return {workout : workout.workouts , diet : workout.diet}
        }
    } catch (error: any) {
        throw new Error(`error at getworkouts.ts : ${error}`)
        
    }
    
}