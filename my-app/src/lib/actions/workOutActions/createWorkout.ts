'use server'

import WorkOut from "@/lib/models/WorkoutSchema"
import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "../userActions/fetchUser"
import { log } from "console"
import User from "@/lib/models/userSchema"

interface Props{
    running : boolean,
    workout : string[],
    caloriesBurnt : number,
    runningDuration? : number,
    runningDistance? : number
}

export async function createMyWorkout({running , workout , caloriesBurnt , runningDistance , runningDuration} : Props){
    try {
        connectToDB()

        const user = await currentUser()
        if(!user) return console.log('no user found');
        // console.log(user)
        const mongoUser = await fetchUser({userId : user.id})
        if(!mongoUser) return console.log('no user found');
        console.log(mongoUser._id)

        const Workout = new WorkOut({
            running,
            workout,
            caloriesBurnt,
            runningDuration,
            runningDistance
        })

        const savedWorkout = await Workout.save()
        console.log(savedWorkout._id)

        const userToPushWorkOutTo = await User.findById(mongoUser._id)
        console.log(userToPushWorkOutTo.username);
        console.log(savedWorkout._id)
        
        if(!userToPushWorkOutTo){
            console.log('user not found')
        }
        userToPushWorkOutTo.workouts.push(savedWorkout._id)
        await userToPushWorkOutTo.save()

        return {message :"Great Job! workout saved successfully." , status : "success"}
    } catch (error: any) {
        return  {Error : error.message}
        // throw new Error(`Error at createWorkout.ts : ${error}`)
    }
}