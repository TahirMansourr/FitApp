'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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

import { Textarea } from "../ui/textarea"
import { createComment } from "@/lib/actions/postActions/createComment"
import Image from "next/image"
import { Input } from "../ui/input"

const formSchema = z.object({
    comment: z.string().min(1, {
    message: "Challenge name must be at least 2 characters.",
  }),
})

interface Props{
    currentUserImage : string,
    currentPostId : string,
    currentUserId : string
}

const CommentForm = ({
    currentUserImage,
    currentUserId,
    currentPostId
} : Props
) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form Data:", values);
        
        await createComment({
            id : currentPostId,
            author : currentUserId,
            text : values.comment
        })
    
      }
      
  return (
    <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                    <FormItem>
                    <div className="flex items-center gap-3 ">
                    <FormLabel>
                      <Image 
                      src={currentUserImage}
                      alt="user image"
                      width={50}
                      height={50}
                      className=" rounded-full"
                      />
                    </FormLabel>
                    <FormControl>
                        <Input
                        placeholder="write comment here" 
                        className="rounded-2xl bg-white shadow-xl placeholder:text-gray text-black text-lg w-full h-fit " 
                        {...field}
                        />
                    </FormControl>
                    <Button 
                    type="submit"
                    className="className=' mx-auto rounded-xl mt-3 text-white hover:scale-105 shadow-xl hover:bg-blue-950   bg-gradient-to-br from-[#161A30] to-[#232e6c] '"
                    > Reply</Button>
                    </div>
                    <FormMessage className=" text-red-600" />
                    </FormItem>
                     )}
             />
                    
            </form>
        </Form>
    </div>
  )
}

export default CommentForm