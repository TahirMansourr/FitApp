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
import { Input } from "../ui/input"
import { setGoals } from "@/lib/actions/GoalActions"
import { useState } from "react"
import LoadingComponent from "../LoadingComponent"
import { FcApproval } from "react-icons/fc"



const formSchema = z.object({
    caloriesIn : z.coerce.number(),
    caloriesBurnt :z.coerce.number()
})

 const Goalform = () => {

    const [loading ,setLoading] = useState<boolean>(false)
    const [message , setMessage] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {

        setLoading(true)
        await setGoals({
            caloriesIn : values.caloriesIn,
            caloriesBurnt : values.caloriesBurnt
        }).then(res =>{
            if(res.status === 'ok'){
                setMessage(res.message)
                setLoading(false)
            }
       } )
      }

      return(
        <div>
        { !message ?
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center">
                    <div className="flex gap-4">
                    <FormField
                    control={form.control}
                    name="caloriesIn"
                    render={({ field }) => (
                        <FormItem>
                        <div className="flex items-center gap-2 ">
                        <FormLabel>
                            CalsIn
                        </FormLabel>
                        <FormControl>
                            <Input
                            placeholder="" 
                            className="rounded-xl bg-white shadow-xl placeholder:text-gray text-black text-sm w-16  h-8 " 
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
                    name="caloriesBurnt"
                    render={({ field }) => (
                        <FormItem>
                        <div className="flex items-center gap-2">
                        <FormLabel>
                            CalsBurnt
                        </FormLabel>
                        <FormControl>
                            <Input
                            placeholder="" 
                            className="rounded-xl bg-white shadow-xl placeholder:text-gray text-black text-sm w-16  h-8 " 
                            {...field}
                            />
                        </FormControl>
                        
                        </div>
                        <FormMessage className=" text-red-600" />
                        </FormItem>
                        )}
                />
                    </div>
            
                    <Button type="submit"className=' rounded-xl text-white hover:scale-105 shadow-xl hover:bg-blue-950   bg-gradient-to-br from-[#161A30] to-[#232e6c] '>
                    {loading? <LoadingComponent LoadingText="Setting new goals..."/> : "Set today's goals"}</Button>
                </form>
            </Form>
        : <div className=" flex gap-3 items-center">
        <FcApproval size={30}/>
       <div>{message}</div>
      </div>}
    </div>
      )
}

export default Goalform;