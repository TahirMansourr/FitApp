'use server'

import { currentUser } from "@clerk/nextjs"

export async function getcurrentUser(){
    return await currentUser()
}