'use server'

import { currentUser } from "@clerk/nextjs"
import { fetchUser } from "./fetchUser";
import OnBoarding from "@/app/(auth)/onBoarding/page";

export async function getcurrentUser(){
    const user = await currentUser()
    if(!user) return console.log('no user found');
    // console.log(user)
    const mongoUser = await fetchUser({userId : user.id})
    if(!mongoUser) 
     {console.log('no user found');
    return {onBoarding : "false"}}
    else {
        return {OnBoarding : 'true'}
    }
}