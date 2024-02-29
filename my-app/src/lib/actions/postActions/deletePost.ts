'use server'

import Post from "@/lib/models/PostSchema"
import { connectToDB } from "@/lib/mongoose"

export async function DeletePost( id : string) {
    try {
        connectToDB()

       await Post.deleteOne({_id : id})
       

    } catch (error : any) {
        throw new Error(`Error at deletePost.ts : ${error}`)
    }
}