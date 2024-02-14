'use server'

import User from "../models/userSchema"
import { connectToDB } from "../mongoose"

interface Props{
    userId : string,
    username : string,
    age : number,
    height : number,
    weight : number,
    profileImage : string
}
export async function updateUser({
    userId,
    username,
    age,
    height,
    weight,
    profileImage
} : Props){

    connectToDB()
   try {
    await User.findOneAndUpdate(
        {id : userId},
        { 
            username : username.toLowerCase(),
            age,
            Height : height,
            Weight : weight,
            
        },
        {upsert : true}
    )
   } catch (error) {
    throw new Error(`Failed to create/update user : ${error}`)
   }
}