'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


import { Input } from "@/components/ui/input"
import Image from "next/image"
import { updateUser } from "@/lib/actions/userActions/updateUser"
import profile from '../../../public/assets/profile.svg'
import { ChangeEvent, useState } from "react"
import { Textarea } from "../ui/textarea"
import logo from '../../../public/assets/logo.svg'
import { LuSend } from "react-icons/lu";
import { createPost } from "@/lib/actions/postActions/createPost"


const formSchema = z.object({
    post: z.string().min(2, {
      message: "You can't create a 2 word post",
    }),
  })

  interface Props {
    userId : string,
    imageUrl : string ,
    username : string 
  }
const CreateFormPost = ({userId , imageUrl , username} : Props) => {

    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Data:", values);
    await createPost({
        text : values.post,
        author : userId
    })
    
  }
  
    return(
        <Card className=" w-full">
            <CardContent>
                <div>
                    <section className="flex item-center gap-3 mb-3">
                        <Image
                            src={imageUrl}
                            alt="post creator photo"
                            width={40}
                            height={40}
                            className=" rounded-full"
                            />
                            <p>{username}</p>
                    </section>
                    <section>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="post"
                            render={({ field }) => (
                                <FormItem>
                                <div className=" relative">
                                <FormControl>
                                    <Textarea  
                                    placeholder="write your post here ..." 
                                    className=" mt-2 rounded-2xl bg-gray bg-opacity-10 shadow-sm placeholder:text-gray text-black text-lg border-white resize-y overflow-y-auto pr-7  " 
                                    {...field}
                                    />
                                </FormControl>
                                <LuSend 
                                 color="blue" 
                                 className="absolute bottom-[1%] right-4 transform -translate-y-1/2 cursor-pointer"
                                 size={24} // Set the size of the icon
                                 onClick={() => form.handleSubmit(onSubmit)()}
                                 />
                                </div>
                                <FormMessage className=" text-red-600" />
                                </FormItem>
                            )}
                            />
                        
                            {/* <Button 
                            type="submit"
                            className=" bg-blue-500 text-white rounded-xl"
                            > Post</Button> */}
                        </form>
                        </Form>
                    </section>
                </div>
            </CardContent>
            <CardFooter>
                <footer className="flex gap-3.5">

                
                </footer>
            </CardFooter>
        </Card>

    )
}

export default CreateFormPost;