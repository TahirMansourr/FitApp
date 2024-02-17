'use server'

import Post from "@/lib/models/PostSchema"
import User from "@/lib/models/userSchema"
import { connectToDB } from "@/lib/mongoose"

async function fetchAllPosts( pageNumber = 1 , pageSize = 20){
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
        // .populate({
        //     path : "Children",
        //     populate({
        //         path : "author",
        //         model : User,
        //         select : []
        //     })

        // })
        // TODO add the population for the community and the rest of the stuff
    
    } catch (error) {
        
    }
}