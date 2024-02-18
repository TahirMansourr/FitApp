'use server'

import Post from "@/lib/models/PostSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"

export async function fetchAllPosts( pageNumber = 1 , pageSize = 20){
    try {
        connectToDB()
    
    const skipAmount = (pageNumber - 1) * pageSize
    const postsQuery = Post.find({parentId : {$in : [null , undefined]}})
        .sort({createAt : "desc"})
        .skip(skipAmount)
        .populate({
            path : "author",
            model : User
        })
        .populate({
            path : "children",
            populate : {
                path : "author",
                model : User,
                select : " name _id"
            }
         })
        // TODO add the population for the community and the rest of the stuff

        const totalPostsCount = await Post.countDocuments({ parentId : {$in : [null , undefined]}})

        const posts = await postsQuery.lean().exec()
        const isNext = totalPostsCount > skipAmount + posts.length

        return {posts , isNext}
    
    } catch (error : any) {
        throw new Error(`error at fetchAllPosts.ts : ${error}`)
    }
}