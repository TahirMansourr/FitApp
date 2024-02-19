'use server'

import Post from "@/lib/models/PostSchema"
import { connectToDB } from "@/lib/mongoose"

interface Props{
    id : string,
    author : string,
    text : string
}

export async function createComment( {id , author , text} : Props){
    try {
        connectToDB()

        const originalPost = await  Post.findById(id)

        if(!originalPost){
            throw new Error(`cannot find the post you want to add comment to`)
        }

        const commentPost = new Post({
            text ,
            author,
            parentId : id
        })

        const savedCommentPost = await commentPost.save()

        originalPost.children.push(savedCommentPost._id)
        await originalPost.save()

        
    } catch (error : any) {
        throw new Error(` Error at createComment.ts : ${error}`)
    }
}