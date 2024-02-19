'use server'

import Post from "@/lib/models/PostSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"

export async function getSinglePost(id : string) {
   try {
    connectToDB()

    const result = Post.findById(id).populate({
         path : "author" ,
          model : User
        })
        .populate({
         path : "children",
         model : Post,
         populate : {
            path : "author",
            model : User
         }
        })
   
    const finalresult = await result.lean().exec()

    return finalresult
    
   } catch (error : any) {
    throw new Error(` Error at fetchSinglePost.ts : ${error}`)
   }
}