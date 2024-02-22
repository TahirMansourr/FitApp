'use server'

import WorkOut from "@/lib/models/WorkoutSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs"

export async function getworkout() {
    connectToDB
    try {
        const user = await currentUser()
        if(!user) throw new Error(`cannot find user at getworkout.ts`)

        const workout = await User.findOne({id : user.id}).populate({
            path : 'workouts',
            model : WorkOut
        }).lean()
        if(!workout) throw new Error(`Error at getworkouts.tsx at getting  mongoUser`)
        console.log(workout)
        if (!Array.isArray(workout)) { 
        
        return workout.workouts
        }
    } catch (error: any) {
        throw new Error(`error at getworkouts.ts : ${error}`)
        
    }
    
}