import ComForcom from "@/components/commentComponent/comForcom"
import CommentComponent from "@/components/commentComponent/comment"
import PostCard from "@/components/postComponents/postCard"
import { getSinglePost } from "@/lib/actions/postActions/fetchSinglePost"
import { fetchUser } from "@/lib/actions/userActions/fetchUser"
import { currentUser } from "@clerk/nextjs"

const SinglePost =  async ({params} : {params : {id : string}}) => {
   
    const fetchThatPost = await getSinglePost(params.id)
    console.log(fetchThatPost);
    const user = await currentUser()
    if(!user) return null
    const mongoUser = await fetchUser({userId : user.id})
    if(!mongoUser) return null
    if (!Array.isArray(fetchThatPost)) { // this is because sometime mongodb returns an array and just to make sure it's not
        // console.log(fetchThatPost);
        console.log("This is what you wantttttttttttttttttttttttttttttttttttttttttt"+fetchThatPost?.children)
    if(! fetchThatPost) return null
    

  return (
    <div className=" flex flex-col justify-center items-center pt-20 bg-white dark:bg-black dark:text-white min-h-screen">
        <PostCard
            author = {fetchThatPost.author}
            // imageUrl= { fetchThatPost.author}
            text= {fetchThatPost.text}
            id = {fetchThatPost._id as string}
            childCom= {fetchThatPost.children}
            createdAt={ fetchThatPost.createdAt}
        />
        <CommentComponent
            currentUserImage = {mongoUser.image}
            currentPostId = {fetchThatPost._id as string}
            currentUserId = {mongoUser._id as string}
        />

        <section className=" w-[90%]  pt-10 ">
            {fetchThatPost.children.length > 0 ? 
                fetchThatPost.children.map(( item :any , index : number) => {
                    return(
                        <ComForcom    
                             key={index}                      
                             author={item.author}
                             text = {item.text}
                             id = {item.id}
                             childCom={item.children}
                             createdAt={item.createdAt}
                             currentUserImage = {mongoUser.image}
                             currentUserId = {mongoUser._id as string}
                             currentPostId = {item._id}
                            /> 
                    )
                })
            : <h1> there are no comments for this post</h1>}
        </section>
    </div>

  )
}
return null
}

export default SinglePost