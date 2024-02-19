import CommentComponent from "@/components/commentComponent/comment"
import PostCard from "@/components/postComponents/postCard"
import { getSinglePost } from "@/lib/actions/postActions/fetchSinglePost"
import { currentUser } from "@clerk/nextjs"

const SinglePost =  async ({params} : {params : {id : string}}) => {
   
    const fetchThatPost = await getSinglePost(params.id)
    console.log(fetchThatPost);
    if (!Array.isArray(fetchThatPost)) {
        console.log(fetchThatPost);
    if(! fetchThatPost) return null
    

  return (
    <div className=" flex flex-col justify-center items-center">
        <PostCard
            author = {fetchThatPost.author.username}
            imageUrl= { fetchThatPost.author.image}
            text= {fetchThatPost.text}
            id = {fetchThatPost._id as string}
        />
        <CommentComponent
            currentUserImage = {fetchThatPost.author.image}
            currentPostId = {fetchThatPost._id as string}
            currentUserId = {fetchThatPost.author._id as string}
        />

        {fetchThatPost.children.length > 0 ? 
            fetchThatPost.children.map(( item : {author : string, imageUrl : string , text: string , id: string}) => {
                <PostCard
                    author={item.author}
                    imageUrl={item.imageUrl}
                    text = {item.text}
                    id = {item.id}
                />
            })
        : null}
    </div>

  )
}
return null
}

export default SinglePost