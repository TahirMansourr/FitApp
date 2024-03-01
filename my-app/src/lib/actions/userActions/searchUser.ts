'use server'

import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs"
import { FilterQuery } from "mongoose"
import { fetchUser } from "./fetchUser"
import { log } from "console"

interface Props{
    pageNumber : number, 
    pageSize : number,
    searchParam? : string,
    userId : string
}

export async function SearchUser({pageNumber , pageSize ,searchParam = '', userId} : Props) {
    try {
        connectToDB()
        
        const skipAmount = (pageNumber -1) * pageSize
        const regExp = new RegExp( searchParam , "i")
        const query : FilterQuery<typeof User> = { id : {$ne : userId}}

        if(searchParam.trim() !== ''){
            query.$or = [
                {username : { $regex : regExp}},
                {name : {$regex : regExp}}
            ]
        }

        const userQuery = User.find(query)
        .skip(skipAmount)
        .limit(pageSize)

        const users = await userQuery.exec()
        console.log(users);
        
        return users
    } catch (error: any) {
        throw new Error(`Error at SearchUser.ts : ${error}`)
    }
}