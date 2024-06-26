import LoadingComponent from "@/components/LoadingComponent";
import PostCard from "@/components/postComponents/postCard"
import { fetchAllPosts } from "@/lib/actions/postActions/fetchAllPosts"

async function Posts(){

  const result  = await fetchAllPosts(1 ,30)
  if(!result) return;
  
  
  return (
    <div className="flex flex-col justify-center items-center align-middle mt-20 bg-white dark:bg-black dark:text-white min-h-screen ">
      {result.posts.length === 0 ? <LoadingComponent LoadingText="Just a moment please" /> : (
        result.posts.reverse().map((item , index) => (
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