import PostCard from "@/components/postComponents/postCard"
import { currentUser } from "@clerk/nextjs"


async function Posts(){

  const user = await currentUser()
  return (
    <div className=' flex justify-center align-middle w-full'>
      <PostCard/>
    </div>
  )
}

export default Posts