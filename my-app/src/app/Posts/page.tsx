import PostCard from "@/components/postComponents/postCard"
import { fetchAllPosts } from "@/lib/actions/postActions/fetchAllPosts"

async function Posts(){

  const result  = await fetchAllPosts(1 ,30)
  if(!result) return;
  
  
  return (
    <div className="flex flex-col justify-center items-center align-middle w-full">
      {result.posts.length === 0 ? <h1>loading...</h1> : (
        result.posts.map((item) => (
          <PostCard
            author={item.author}
            text={item.text}
            children = {item.children}
            id = {item._id as string}
            createdAt={item.createdAt}
          />
        ))
      )}
    </div>
  )
}

export default Posts