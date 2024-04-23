'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from "next/image"
import logo from '../../../public/assets/logo.svg'
import heart from '../../../public/assets/heart.svg'
import reply from '../../../public/assets/reply.svg'
import Link from "next/link"
import { Button } from "../ui/button"
import { DeletePost } from "@/lib/actions/postActions/deletePost"
// import DeleteButton from "./deleteButton"
import {headers} from 'next/headers'
import { useEffect, useState } from "react"
import CommentComponent from "./comment"
import PostCard from "../postComponents/postCard"
import { getSinglePost } from "@/lib/actions/postActions/fetchSinglePost"

interface Props{
    author : {
        username : string,
        image : string,
        _id : string
    },
    text : string,
    id : string
    children? : Object[]
    createdAt : Date,
    shouldDelete? : boolean,
    isComment? : boolean,
    currentUserImage : string,
    currentUserId :string,
    currentPostId  : string
}
// ok so the idea here is to make something like the post card but for comments
const ComForcom = ({author , text , id , children , createdAt , currentUserId , currentUserImage ,currentPostId} : Props) => {

    const [com , setCom] = useState<boolean>(false)
    const [comArr , setComArr] = useState<any[]>([])

    useEffect(() => {
        async function fetchComments() {
            const comments = [];
            for (const item of children || []) {
                const singleItem = await getSinglePost(item as string);
                comments.push(singleItem);
            }
            setComArr(comments);
        }
        fetchComments();
    }, [children]);
    

    const handleClick = ()=>{
        setCom(!com)
    }
    console.log('this is what you want :' + children);
    

  return (
    <div>
         <div className=" w-[90%]  p-6 mb-2">
        <Card className=" w-full ">
            <CardContent>
                <div>
                    <section className="flex item-center gap-3 mb-3">
                        <Image
                            src={author.image}
                            alt="post creator photo"
                            width={40}
                            height={40}
                            className=" rounded-full"
                            />
                            <Link href = {`/Profile/${author._id}`}>
                                 <p  className=" font-bold text-xl font-serif">{author.username}</p>
                            </Link>
                    </section>
                    <section> {text} </section>
                </div>
            </CardContent>
            <CardFooter>
                <footer className="flex gap-3.5 items-center">
                    <Image 
                       src={heart}
                       alt="likes image"
                       width={20}
                       height={20}
                       className=""
                       />
                   
                        {/* <Link href={`Posts/${id}`} className="flex gap-1"> */}
                        <Button
                        onClick={handleClick}>
                        <Image 
                            src={reply}
                            alt="reply"
                            width={20}
                            height={20}
                            className=""
                            />
                         <p>{`${children?.length} comments`}</p>
                        </Button>
                       
                    {/* </Link> */}
                    
                    
                    <p>{createdAt?.toDateString()}</p>
                    {/* {shouldDelete && 
                    <DeleteButton id = {id as string}/>
                    } */}
                </footer>
            </CardFooter>
        </Card>
        { com &&
        <div className="mt-3 w-[95%] mx-auto">
        <Card className=" p-8 pt-3">
            <CommentComponent
            currentUserId={currentUserId}
            currentUserImage={currentUserImage}
            currentPostId={currentPostId}
            />
            { children && comArr.length > 0 ?

                <CardContent>
               { comArr.map((item : any , index : number) => (
                <div className=" rounded-2xl shadow-lg m-3 p-2 bg-opacity-10" key={index}>
                     <div className=" flex gap-3">
                        <Image
                        src={item.author.image}
                        alt="author image"
                        width={34}
                        height={34}
                        className="rounded-full"
                        />
                        <p> {item.author.username} </p>
                    </div>
                    <p> {item.text} </p>
                </div>
               

                //    <PostCard
                //    author = {item.author}
                //    // imageUrl= { fetchThatPost.author}
                //    text= {item.text}
                //    id = {item._id as string}
                //    children= {item.children}
                //    createdAt={ item.createdAt}
                //    />
                   )) }
                </CardContent>
           
               
                : null
            }
             </Card>
        </div>
        

            // <Card>
            //     <CardContent>
            //         hey! you there
            //     </CardContent>
            // </Card>
        }

    </div>
    </div>
  )
}

export default ComForcom