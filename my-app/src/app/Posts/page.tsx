import PostCard from "@/components/postComponents/postCard"
import { fetchAllPosts } from "@/lib/actions/postActions/fetchAllPosts"

async function Posts(){

  const result  = await fetchAllPosts(1 ,30)
  if(!result) return;
  
  
  return (
    <div className="flex flex-col justify-center items-center align-middle mt-20 ">
      {result.posts.length === 0 ? <h1>loading...</h1> : (
        result.posts.map((item , index) => (
          <PostCard
            key={index}
            author={item.author}
            text={item.text}
            childCom = {item.children}
            id = {item._id as string}
            createdAt={item.createdAt}
          />
        ))
      )}
    </div>
  )
}

export default Posts