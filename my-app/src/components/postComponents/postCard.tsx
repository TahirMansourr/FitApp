
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
// import logo from '../../../public/assets/logo.svg'
  
interface Props{
    author : {
        username : string,
        image : string,
    },
    text : string,
    id : string
    children? : Object[]
}

const PostCard = ({author , text , id , children} : Props) => {
  return (
    <div className=" w-[90%]  p-6">
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
                            <p  className=" font-bold text-xl font-serif">{author.username}</p>
                    </section>
                    <section> {text} </section>
                </div>
            </CardContent>
            <CardFooter>
                <footer className="flex gap-3.5">
                    <Image 
                       src={heart}
                       alt="likes image"
                       width={20}
                       height={20}
                       className=""
                    //    onClick={ add a todo here for the likes}
                    />
                    <Link href={ `Posts/${id}`} className="flex gap-1">
                        <Image 
                            src={reply}
                            alt="reply"
                            width={20}
                            height={20}
                            className=""
                            />
                         <p>{`${children?.length} comments`}</p>
                    </Link>
                     
                   {/* <Image 
                       src={}
                       alt=""
                       width={}
                       height={}
                       className=""
                    />
                    <Image 
                       src={}
                       alt=""
                       width={}
                       height={}
                       className=""
                    /> */}
                </footer>
            </CardFooter>
        </Card>

    </div>
  )
}

export default PostCard