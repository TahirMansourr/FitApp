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
                    <div className="flex ">
                    <FormLabel>
                      <Image 
                      src={currentUserImage}
                      alt="user image"
                      width={24}
                      height={24}
                      className=" rounded full"
                      />
                    </FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="write comment here" 
                        className=" mt-2 rounded-2xl bg-white shadow-sm placeholder:text-gray text-black text-lg w-full " 
                        {...field}
                        />
                    </FormControl>
                    <Button 
                    type="submit"
                    className=" to-blue-600  rounded-xl"
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