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
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { updateUser } from "@/lib/actions/userActions/updateUser"
import profile from '../../../public/assets/profile.svg'
import { ChangeEvent, useState } from "react"
import { isBase64Image } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useFormContext } from "@/components/multiStepForm/formContext"



const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    profileImage : z.string().url()
  })
  const formcontext = useFormContext()

const FirstStep = () => {

    const[files , setFiles] =useState<File[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: formcontext?.user?.username ? formcontext.user.username  : '',
          profileImage : formcontext?.user?.image ?formcontext.user.image : '',
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form Data:", values);
        console.log(values)
      }

      const handleImageChange = ( 
        event :ChangeEvent<HTMLInputElement> ,
         onchange : (value : string) => void
         )=> {
          event.preventDefault() // if i dont have this line the form submits when the input field changes

          const fileReader = new FileReader()
          if(event.target.files && event.target.files.length > 0){

            const file = event.target.files[0]
            setFiles(Array.from(event.target.files))

            if(!file.type.includes("image")) return
            // this sets the event handler to be executed when the file is finished reading
            fileReader.onload = async (event) => {
              const imageDataUrl = event.target?.result?.toString() || ''
              onchange(imageDataUrl)
            }
            fileReader.readAsDataURL(file)
          }
      }

    return(
        <div className=" w-[500px] rounded-2xl mt-3  bg-gradient-to-tl from-[#161A30] to-[#232e6c] text-white p-10">
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
               {
               field.value? 
               <Image
                    src = {field.value}
                    alt = 'profile picture'
                    width={80}
                    height={80}
                    className=" rounded-full"
                /> : 
                <Image
                    src = '../../../public/assets/profile.svg'
                    alt = 'profile picture'
                    width={50}
                    height={50}
                    className=" rounded-full"
                />
                }
              </FormLabel>
              <FormControl>
              {/* <UploadButton
                  endpoint="media"
                  onClientUploadComplete={(res) => {
                  
                    console.log("Files: ", res);
                    alert("Upload Completed");
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                /> */}
                <Input
                 placeholder="no fle "
                 className=" " 
                 type= "file"  
                 accept='image/*'
                 onChange={ e => handleImageChange(e , field.onChange)}
                />
              </FormControl>
              <FormMessage className=" text-red-600"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel >Username</FormLabel>
              <FormControl>
                <Input 
                placeholder="shadcn" 
                 className=" mt-2 rounded-2xl bg-white text-black shadow-sm placeholder:text-gray"
                  {...field}
                  />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        </form>
         </Form>
        
        
      
      </div >
    )
}

export default FirstStep;