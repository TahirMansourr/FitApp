import PostCard from "@/components/postComponents/postCard"
import { fetchAllPosts } from "@/lib/actions/postActions/fetchAllPosts"
import { currentUser } from "@clerk/nextjs"
import { Suspense } from "react"



async function Posts(){

  const result  = await fetchAllPosts(1 ,30)
  if(!result) return;
  
  
  return (
    <div className="flex flex-col justify-center items-center align-middle w-full">
      {result.posts.length === 0 ? <h1>loading...</h1> : (
        result.posts.map((item) => (
          <PostCard
            author={item.author.username}
            text={item.text}
            imageUrl= {item.author.image}
            id = {item._id as string}
          />
        ))
      )}
    </div>
  )
}

export default Posts