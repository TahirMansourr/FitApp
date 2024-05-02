'use server'

import Post from "@/lib/models/PostSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"

interface Params {
    text: string,
    author: string,
  }

export async function createPost({text , author} : Params) {
    try {
        connectToDB()

        const createPost = await Post.create({
            text,
            author
        })
        
        await User.findByIdAndUpdate( author , { $push : {Posts : createPost._id}}) 
        return {status : "success"}
    } catch (error:any) {
        return {stautus : 'error'}
        throw new Error(`Error at createPost.ts : ${error}`)
    }
}