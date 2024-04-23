
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
import DeleteButton from "./deleteButton"
// import logo from '../../../public/assets/logo.svg'
  
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
    isComment? : boolean
}

const PostCard = ({author , text , id , children , createdAt , shouldDelete , isComment} : Props) => {

  return (
    <div className=" w-[70%] pt-6 ">
        <Card className=" w-full shadow-md rounded-s-none rounded-e-none ">
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
                        <Link href={`/Posts/${id}`} className="flex gap-1">
                        <Image 
                            src={reply}
                            alt="reply"
                            width={20}
                            height={20}
                            className=""
                            />
                         <p>{`${children?.length} comments`}</p>
                    </Link>                   
                    <p>{createdAt?.toDateString()}</p>
                    {shouldDelete && 
                    <DeleteButton id = {id as string}/>
                    }
                </footer>
            </CardFooter>
        </Card>
    </div>
  )
}

export default PostCard