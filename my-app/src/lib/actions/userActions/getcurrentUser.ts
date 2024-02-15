'use server'

import { currentUser } from "@clerk/nextjs"

async function getcurrentUser(){
    return await currentUser()
}