'use server'

import { currentUser } from "@clerk/nextjs"
import { connectToDB } from "../mongoose"
import { fetchUser } from "./userActions/fetchUser"
import User from "../models/userSchema"
import { fetchUserWithMongoId } from "./userActions/findMongoUser"
import Goal from "../models/GoalsSchema"

interface goal{
    caloriesIn : number,
    caloriesBurnt : number,
    date? : Date
}

export async function setGoals(params: goal) {
    connectToDB()
    try {
    const user = await currentUser()
    if(!user) throw new Error(`Error at createMeal.tsx at getting clerk User : ${Error}`)

    const mongoUser = await fetchUser({userId : user.id})
    if(!mongoUser) throw new Error(`Error at createMeal.tsx at getting clerk mongoUser : ${Error}`)

    const todaysGoal = new Goal({
        caloriesIn : params.caloriesIn,
        caloriesBurnt : params.caloriesBurnt
    })

    const updatedUser =  await User.findOneAndUpdate(
        { _id: mongoUser._id }, 
        { $set: { goals: params } }, 
        { new: true } 
    );

    await updatedUser.save()
        console.log(updatedUser.goals);

    return {status : "ok" , message : 'You have successfully set todays goals!'} 
    } catch (error : any) {
        throw new Error(`Error at GoalActions.ts : ${error}`)
    }
}

export async function getGoals(){
    connectToDB()
    try {
        const user = await currentUser()
    if(!user) throw new Error(`Error at createMeal.tsx at getting clerk User : ${Error}`)

    const mongoUser = await fetchUser({userId : user.id})
    if(!mongoUser) throw new Error(`Error at createMeal.tsx at getting clerk mongoUser : ${Error}`)

    const requiredUser = await fetchUserWithMongoId({userId : mongoUser._id})
    return {status : 'ok' , goals : requiredUser.goals}
    } catch (error) {
        throw new Error(`error at getGoals : ${error}`)
    }
}