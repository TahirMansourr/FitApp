'use server'

import Challenge from "@/lib/models/ChallengeSchema"
import { connectToDB } from "@/lib/mongoose"
import { fetchUser } from "../userActions/fetchUser"
import User from "@/lib/models/userSchema"

interface Props {
    userId : string,
    name : string,
    body : string,

}

export async function createChallenge ({userId , name  , body} : Props){
  connectToDB()
  try {

    const userObjectId = await fetchUser({userId})
    await Challenge.create({
        createdBy : userObjectId._id,
        name,
        body
    })
    // .populate({
    //     path : "User",
    //     model : User
    // })
  } catch (error : any) {
    throw new Error(`Error at creating Challenge in createChallenge.ts : ${error.message}`)
  }
}