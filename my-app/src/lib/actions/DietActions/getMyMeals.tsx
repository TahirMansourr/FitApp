'use server'

import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "../userActions/fetchUser"
import User from "@/lib/models/userSchema"
import { findDOMNode } from "react-dom"
import Diet from "@/lib/models/DietSchema"

export async function GetMyMeals() {

    const user = await currentUser()
    if(!user) throw new Error(`Error at getMyMeals.tsx at getting clerk User `)

    const mongoUser = await User.findOne({id : user.id}).populate({
        path : 'diet',
        model : Diet
    }).lean()
    if(!mongoUser) throw new Error(`Error at getMyMeals.tsx at getting clerk mongoUser`)

    if (!Array.isArray(mongoUser)) { 
        console.log(mongoUser.diet);
        
    return mongoUser.diet

    }
    else{
        throw new Error(`error at getMyMeals.tx monoUser is returning an array`)
        return null
    }
    // return meals
}