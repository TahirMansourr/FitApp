
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
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { createChallenge } from "@/lib/actions/ChallengeActions/createChallenge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"



const formSchema = z.object({
    name: z.string().min(2, {
    message: "Challenge name must be at least 2 characters.",
  }),
    body : z.string(),
    description : z.string(),
    duration : z.union([z.literal('free') , z.coerce.number()])
})



const CreateChallengeForm = () => {

  const [switchState , setSwitchState] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

 async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form Data:", values);
    console.log(values)

    // const user = await currentUser()
    // if(!user) {
    //   console.log('no user found'); 
    //   return null}
    
    await createChallenge({
     
      name : values.name,
      body : values.body,
      description : values.description,
      duration : switchState ? values.duration : 'free'
    })
  }
  
  return (
    <div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="">
              <FormLabel>Challenge Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="shadcn" 
                className=" mt-2 rounded-2xl bg-white shadow-sm placeholder:text-gray text-black text-lg " 
                {...field}
                />
              </FormControl>
              </div>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
                
                <Label>Is your Challenge Time Limited ?</Label>
                <Switch checked={switchState} onCheckedChange={()=>setSwitchState(!switchState)}/>
              </div>
      {switchState ? <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <div className="">
              <FormLabel>Challenge duration</FormLabel>
              <FormControl>
                <Input 
                type="number"
                placeholder="Challenge Duration" 
                className=" mt-2 rounded-2xl bg-white shadow-sm placeholder:text-gray text-black text-lg " 
                {...field}
                />
              </FormControl>
              </div>
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
      /> : null}
      <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <div className="">
              <FormLabel>Challenge Description</FormLabel>
              <FormControl>
                <Input 
                placeholder="Example : Core Challenge or Chest any Shoulders Challenge" 
                className=" mt-2 rounded-2xl bg-white shadow-sm placeholder:text-gray text-black text-lg " 
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
          name="body"
          render={({ field }) => (
            <FormItem>
              <div className=" ">
              <FormLabel>Challenge Body</FormLabel>
              <FormControl>
                <Textarea
                placeholder="Describe your challenge here" 
                className=" mt-2 rounded-2xl bg-white shadow-sm placeholder:text-gray text-black text-lg" 
                {...field}
                />
              </FormControl>
              </div>
              
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage className=" text-red-600" />
            </FormItem>
          )}
        />
        <Button 
        type="submit"
        className=" bg-green-700 w-full rounded-xl"
        > Create Challenge</Button>
      </form>
      </Form>
    </div>
  )
}

export default CreateChallengeForm