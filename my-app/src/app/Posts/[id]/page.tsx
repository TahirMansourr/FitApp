import CommentComponent from "@/components/commentComponent/comment"
import PostCard from "@/components/postComponents/postCard"
import { getSinglePost } from "@/lib/actions/postActions/fetchSinglePost"
import { currentUser } from "@clerk/nextjs"

const SinglePost =  async ({params} : {params : {id : string}}) => {
   
    const fetchThatPost = await getSinglePost(params.id)
    console.log(fetchThatPost);
    if (!Array.isArray(fetchThatPost)) { // this is because sometime mongodb returns an array and just to make sure it's not
        // console.log(fetchThatPost);
        console.log(fetchThatPost?.children)
    if(! fetchThatPost) return null
    

  return (
    <div className=" flex flex-col justify-center items-center pt-20">
        <PostCard
            author = {fetchThatPost.author}
            // imageUrl= { fetchThatPost.author}
            text= {fetchThatPost.text}
            id = {fetchThatPost._id as string}
            children= {fetchThatPost.children}
            createdAt={ fetchThatPost.createdAt}
        />
        <CommentComponent
            currentUserImage = {fetchThatPost.author.image}
            currentPostId = {fetchThatPost._id as string}
            currentUserId = {fetchThatPost.author._id as string}
        />

//TODO finish the styling here
        <section className=" w-[90%]  ">
            {fetchThatPost.children.length > 0 ? 
                fetchThatPost.children.map(( item :any) => {
                    return( 
                    <PostCard
                        author={item.author}
                        text = {item.text}
                        id = {item.id}
                        children={item.children}
                        createdAt={item.createdAt}
                    />)
                })
            : <h1> there are no comments for this post</h1>}
        </section>
    </div>

  )
}
return null
}

export default SinglePost