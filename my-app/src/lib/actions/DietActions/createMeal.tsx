'use server'

import { currentUser } from "@clerk/nextjs"
import { error } from "console"
import { fetchUser } from "../userActions/fetchUser"
import Diet from "@/lib/models/DietSchema"
import { connectToDB } from "@/lib/mongoose"
import User from "@/lib/models/userSchema"


interface Props{
    meal : string,
    calories : number
}
export async function createMeal (mealsArray : Props[]) {

    connectToDB()
    const user = await currentUser()
    if(!user) throw new Error(`Error at createMeal.tsx at getting clerk User : ${error}`)

    const mongoUser = await fetchUser({userId : user.id})
    if(!mongoUser) throw new Error(`Error at createMeal.tsx at getting clerk mongoUser : ${error}`)


    try {

      const newMeal =  await Diet.create({meals : mealsArray})
      console.log(newMeal);
      const userToUpdate = await User.findByIdAndUpdate(mongoUser._id, {
        $push: { diet: newMeal._id }
    }, { new: true })
     await userToUpdate.save()
      
    } catch (error : any) {
        throw new Error(`Error at createMeal.tsx : ${error}`)
    }
    
}