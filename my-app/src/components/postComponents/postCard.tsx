
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
// import logo from '../../../public/assets/logo.svg'
  

const PostCard = () => {
  return (
    <div className=" w-full p-6">
        <Card className=" w-full">
            {/* <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader> */}
            <CardContent>
                <div>
                    <section className="flex item-center gap-3 mb-3">
                        <Image
                            src={logo}
                            alt="post creator photo"
                            width={40}
                            height={40}
                            className=" rounded-full"
                            />
                            <p>this user</p>
                    </section>
                    <section>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim, aspernatur deleniti sunt praesentium provident fuga omnis laudantium ea odit consequatur autem officia adipisci tempora quaerat possimus, aliquam asperiores, placeat quod.</section>
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
                    />
                     <Image 
                       src={reply}
                       alt="reply"
                       width={20}
                       height={20}
                       className=""
                    />
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