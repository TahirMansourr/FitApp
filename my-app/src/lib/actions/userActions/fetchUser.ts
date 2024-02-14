'use server'

import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"

export async function fetchUser( { userId } : { userId : string}){
    connectToDB()
    try {
        
     return await  User.findOne({ id : userId})

    } catch (error : any) {
        throw new Error(`Error fetching user at fetchUser.ts : ${error.message}`)
    }
}