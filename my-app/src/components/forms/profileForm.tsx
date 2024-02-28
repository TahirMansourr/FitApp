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
// import {useUploadThing} from "@/lib/uploadthing/uploadthing"
import { useRouter } from "next/navigation"
import { UploadButton } from "@/lib/uploadthing/uploadthing"


const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    profileImage : z.string().url(),
    age : z.coerce.number( //z.coerce is used to change the input from string to number otherwise the input is always a string
      {invalid_type_error: "Age must be a number"},
    ),
    weight : z.coerce.number(),
    height : z.coerce.number(),
  
  })

  interface Props{
  user :  { 
    id : string,
    username : string,
    profilePicture : string
  }
  }

const ProfileForm = ( {user} : Props)=>{

  const[files , setFiles] =useState<File[]>([])
  // const {startUpload} = useUploadThing("media")
  const router = useRouter()

  const [steps , setSteps] = useState(1)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: user?.username ? user.username : '',
          profileImage : user?.profilePicture ? user.profilePicture : '',
        },
      })

    const handleNext = ()=>{
      setSteps(steps + 1)
    }

    const handlePrev = ()=>{
      setSteps(steps - 1)
    }
     async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form Data:", values);
        console.log(values)

        const blob = values.profileImage
        const hasImageChanged = isBase64Image(blob)
       
        // if(hasImageChanged){
        //   const imgRes = await startUpload(files)
        //   if(imgRes && imgRes[0].fileurl){
        //     values.profileImage = imgRes[0].fileurl
        //   }
        // }

        await updateUser({
         userId : user.id,
         username : values.username,
         profileImage :  values.profileImage,
         age : values.age,
         height : values.height,
         weight : values.weight
        }
        )

        router.push('/userProfile')

        
      }
        //function for handling the choosing image for the onboarding page
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
       
      { steps === 1 ? 
          <section>
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
        <Button 
        className=" bg-green-300 rounded-xl px-7 text-center hover:bg-green-600 shadow-xl m-2 ml-[75%]"
        onClick={ handleNext}
        >
          Next
        </Button>
        </section>
       : null   }
       {steps === 2 ? 
       
       <section>

        <h1 className=" text-center mb-10">Personal Information</h1>
      
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <div className="  mb-2 flex items-center gap-8">
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                placeholder="age" 
                type="number" 
                className=" rounded-2xl bg-white shadow-sm text-black placeholder:text-gray w-30"
                 {...field}
                 />
              </FormControl>
              </div>
              <FormMessage className=" text-red-600"/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <div className=" mb-2 flex items-center gap-3">
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input 
                placeholder="shadcn" 
                className=" m-0 rounded-2xl bg-white shadow-sm text-black placeholder:text-gray w-30" 
                {...field}
                />
              </FormControl>
              </div>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <div className=" flex items-center gap-4">
              <FormLabel>Height</FormLabel>
              <FormControl >
                <Input 
                placeholder="shadcn"
                 className=" m-0 rounded-2xl bg-white shadow-sm text-black placeholder:text-gray w-30" 
                 {...field} 
                 />
              </FormControl>
              </div>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        <div className=" flex justify-between items-center mt-5">
        <Button 
        className=" bg-green-300 rounded-xl px-7 text-center hover:bg-green-600 shadow-xl m-2 "
        onClick={handlePrev}
        >
          Prev
        </Button>
        <Button className=" bg-white text-blue-700 rounded-2xl shadow-xl" type="submit">Submit</Button>
        </div>
        
        </section> : null }
      </form>
    </Form>

        </div>
      )
}

export default ProfileForm;